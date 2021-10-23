import { imports, global } from 'gnome-shell';

import Clutter from '@gi-types/clutter';
import Gio from '@gi-types/gio';
import Meta from '@gi-types/meta';
import GObject from '@gi-types/gobject';
import { registerClass } from './gobject';
import { ClutterEventType, CustomEventType } from './clutter';

const Util = imports.misc.util;

const X11GestureDaemonXml = `<node>
	<interface name="org.gestureImprovements.gestures">
		<signal name="TouchpadSwipe">
			<arg name="event" type="(siddu)"/>
		</signal>
		<signal name="TouchpadHold">
			<arg name="event" type="(siub)"/>
		</signal>
	</interface>
</node>`;

const DBusWrapperGIExtension = registerClass({
	Signals: {
		'TouchpadSwipe': {
			param_types: [
				GObject.TYPE_STRING,	// phase
				GObject.TYPE_INT,		// fingers
				GObject.TYPE_DOUBLE,	// dx
				GObject.TYPE_DOUBLE, 	// dy
				GObject.TYPE_UINT],		// time
			flags: GObject.SignalFlags.RUN_LAST,
			accumulator: GObject.AccumulatorType.TRUE_HANDLED,
			return_type: GObject.TYPE_BOOLEAN,
		},
		'TouchpadHold': {
			param_types: [
				GObject.TYPE_STRING,	// phase
				GObject.TYPE_INT,		// fingers
				GObject.TYPE_UINT,		// time
				GObject.TYPE_BOOLEAN,	// is_cancelled
			],
			flags: GObject.SignalFlags.RUN_LAST,
			accumulator: GObject.AccumulatorType.TRUE_HANDLED,
			return_type: GObject.TYPE_BOOLEAN,
		},
	},
	Properties: {},
}, class DBusWrapperGIExtension extends GObject.Object {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _proxy?: any;
	private _proxyConnectSignalIds: number[] = [];
	constructor() {
		super();

		if (!Meta.is_wayland_compositor()) {
			const ProxyClass = Gio.DBusProxy.makeProxyWrapper(X11GestureDaemonXml);
			this._proxy = new ProxyClass(
				Gio.DBus.session,
				'org.gestureImprovements.gestures',
				'/org/gestureImprovements/gestures',
			);

			this._proxyConnectSignalIds.push(this._proxy.connectSignal('TouchpadSwipe', this._handleDbusSwipeSignal.bind(this)));
			this._proxyConnectSignalIds.push(this._proxy.connectSignal('TouchpadHold', this._handleDbusHoldSignal.bind(this)));
		}
	}

	dropProxy() {
		if (this._proxy) {
			this._proxyConnectSignalIds.forEach(id => this._proxy.disconnectSignal(id));
			this._proxy.run_dispose();
			this._proxy = undefined;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_handleDbusSwipeSignal(_proxy: never, _sender: never, params: [any]): void {
		const [sphase, fingers, dx, dy, time] = params[0];
		this.emit('TouchpadSwipe', sphase, fingers, dx, dy, time);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_handleDbusHoldSignal(_proxy: never, _sender: never, params: [any]): void {
		const [sphase, fingers, time, is_cancelled] = params[0];
		this.emit('TouchpadHold', sphase, fingers, time, is_cancelled);
	}
});

function GenerateEvent(type: number, sphase: string, fingers: number, time: number, dx?: number, dy?: number, is_cancelled?: boolean): CustomEventType {
	return {
		type: () => type,
		get_gesture_phase: () => {
			switch (sphase) {
				case 'Begin':
					return Clutter.TouchpadGesturePhase.BEGIN;
				case 'Update':
					return Clutter.TouchpadGesturePhase.UPDATE;
				default:
					return Clutter.TouchpadGesturePhase.END;
			}
		},
		get_touchpad_gesture_finger_count: () => fingers,
		get_coords: () => global.get_pointer().slice(0, 2) as [number, number],
		get_gesture_motion_delta_unaccelerated: () => [dx ?? 0, dy ?? 0],
		get_time: () => time,
		get_is_cancelled: () => is_cancelled ?? false,
	};
}

let proxy: typeof DBusWrapperGIExtension.prototype | undefined;
let connectedSignalIds: number[] = [];

export function subscribe(callback: (actor: never | undefined, event: CustomEventType) => boolean): void {
	if (!proxy) {
		if (!Meta.is_wayland_compositor()) {
			Util.spawn(['systemctl', '--user', 'start', 'gesture_improvements_gesture_daemon.service']);
		}
		connectedSignalIds = [];
		proxy = new DBusWrapperGIExtension();
	}

	connectedSignalIds.push(
		proxy.connect('TouchpadSwipe', (_source, sphase, fingers, dx, dy, time) => {
			const event = GenerateEvent(ClutterEventType.TOUCHPAD_SWIPE, sphase, fingers, time, dx, dy);
			return callback(undefined, event);
		}),
	);

	connectedSignalIds.push(
		proxy.connect('TouchpadHold', (_source, sphase, fingers, time, is_cancelled) => {
			const event = GenerateEvent(ClutterEventType.TOUCHPAD_HOLD, sphase, fingers, time, undefined, undefined, is_cancelled);
			return callback(undefined, event);
		}),
	);
}

export function unsubscribeAll(): void {
	if (proxy) {
		connectedSignalIds.forEach(id => proxy?.disconnect(id));
		connectedSignalIds = [];
	}
}

export function drop_proxy(): void {
	if (proxy) {
		unsubscribeAll();
		proxy.dropProxy();
		proxy.run_dispose();
		proxy = undefined;
		if (!Meta.is_wayland_compositor()) {
			Util.spawn(['systemctl', '--user', 'stop', 'gesture_improvements_gesture_daemon.service']);
		}
	}
}