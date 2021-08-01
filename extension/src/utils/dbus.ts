import { CustomEventType, imports } from 'gnome-shell';

import Clutter from '@gi-types/clutter';
import Gio from '@gi-types/gio';
import Meta from '@gi-types/meta';
import GObject from '@gi-types/gobject';

const Util = imports.misc.util;

const X11GestureDaemonXml = `<node>
	<interface name="org.gestureImprovements.gestures">
		<signal name="TouchpadSwipe">
		<arg name="event" type="(siddu)"/>
		</signal>
	</interface>
</node>`;

const DBusWrapperGIExtension = GObject.registerClass({
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
		}
	}
}, class DBusWrapperGIExtension extends GObject.Object {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private _proxy?: any;
	private _proxyConnectSignalId = 0;
	constructor() {
		super();

		if (!Meta.is_wayland_compositor()) {
			const ProxyClass = Gio.DBusProxy.makeProxyWrapper(X11GestureDaemonXml);
			this._proxy = new ProxyClass(
				Gio.DBus.session,
				'org.gestureImprovements.gestures',
				'/org/gestureImprovements/gestures'
			);

			this._proxyConnectSignalId = this._proxy.connectSignal('TouchpadSwipe', this._handleDbusSignal.bind(this));
		}
	}

	dropProxy() {
		if (this._proxy) {
			this._proxy.disconnectSignal(this._proxyConnectSignalId);
			this._proxy.run_dispose();
			this._proxy = undefined;
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_handleDbusSignal(_proxy: never, _sender: never, params: [any]): void {
		const [sphase, fingers, dx, dy, time] = params[0];
		this.emit('TouchpadSwipe', sphase, fingers, dx, dy, time);
	}
});

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
		proxy.connect('TouchpadSwipe', (_proxy: never, sphase: string,
			fingers: number, dx: number, dy: number, time: number) => {
			const event: CustomEventType = {
				type: () => Clutter.EventType.TOUCHPAD_SWIPE,
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
				get_coords: () => [0, 0],
				get_gesture_motion_delta_unaccelerated: () => [dx, dy],
				get_time: () => time,
			};
			return callback(undefined, event);
		})
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