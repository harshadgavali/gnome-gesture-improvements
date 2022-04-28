import Clutter from '@gi-types/clutter';
import Gio from '@gi-types/gio2';
import GObject from '@gi-types/gobject2';
import { CustomEventType, global, imports } from 'gnome-shell';
import { registerClass } from '../../common/utils/gobject';
import { printStack } from '../../common/utils/logging';

const Util = imports.misc.util;

const X11GestureDaemonXml = `<node>
	<interface name="org.gestureImprovements.gestures">
		<signal name="TouchpadSwipe">
			<arg name="event" type="(siddu)"/>
		</signal>
		<signal name="TouchpadHold">
			<arg name="event" type="(siub)"/>
		</signal>
		<signal name="TouchpadPinch">
			<arg name="event" type="(siddu)" />
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
				GObject.TYPE_BOOLEAN],	// cancelled?
			flags: GObject.SignalFlags.RUN_LAST,
			accumulator: GObject.AccumulatorType.TRUE_HANDLED,
			return_type: GObject.TYPE_BOOLEAN,
		},
		'TouchpadPinch': {
			param_types: [
				GObject.TYPE_STRING,	// phase
				GObject.TYPE_INT,		// fingers
				GObject.TYPE_DOUBLE,	// angle_delta
				GObject.TYPE_DOUBLE, 	// scale
				GObject.TYPE_UINT],		// time
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

		const ProxyClass = Gio.DBusProxy.makeProxyWrapper(X11GestureDaemonXml);
		this._proxy = new ProxyClass(
			Gio.DBus.session,
			'org.gestureImprovements.gestures',
			'/org/gestureImprovements/gestures',
		);

		this._proxyConnectSignalIds.push(this._proxy.connectSignal('TouchpadSwipe', this._handleDbusSwipeSignal.bind(this)));
		this._proxyConnectSignalIds.push(this._proxy.connectSignal('TouchpadHold', this._handleDbusHoldSignal.bind(this)));
		this._proxyConnectSignalIds.push(this._proxy.connectSignal('TouchpadPinch', this._handleDbusPinchSignal.bind(this)));
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
		// (siddu)
		const [sphase, fingers, dx, dy, time] = params[0];
		this.emit('TouchpadSwipe', sphase, fingers, dx, dy, time);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_handleDbusHoldSignal(_proxy: never, _sender: never, params: [any]): void {
		// (siub)
		const [sphase, fingers, time, cancelled] = params[0];
		this.emit('TouchpadHold', sphase, fingers, time, cancelled);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_handleDbusPinchSignal(_proxy: never, _sender: never, params: [any]): void {
		// (siddu)
		const [sphase, fingers, angle_delta, scale, time] = params[0];
		this.emit('TouchpadPinch', sphase, fingers, angle_delta, scale, time);
	}
});

type EventOptionalParams = Partial<{
	dx: number,
	dy: number,
	pinch_scale: number,
	pinch_angle_delta: number,
	is_cancelled: boolean,
}>;

function GenerateEvent(typ: Clutter.EventType, sphase: string, fingers: number, time: number, params: EventOptionalParams): CustomEventType {
	return {
		type: () => typ,
		get_gesture_phase: () => {
			switch (sphase) {
				case 'Begin':
					return Clutter.TouchpadGesturePhase.BEGIN;
				case 'Update':
					return Clutter.TouchpadGesturePhase.UPDATE;
				default:
					return params.is_cancelled ? Clutter.TouchpadGesturePhase.CANCEL : Clutter.TouchpadGesturePhase.END;
			}
		},
		get_touchpad_gesture_finger_count: () => fingers,
		get_coords: () => global.get_pointer().slice(0, 2) as [number, number],
		get_gesture_motion_delta_unaccelerated: () => [params.dx ?? 0, params.dy ?? 0],
		get_time: () => time,
		get_gesture_pinch_scale: () => params.pinch_scale ?? 1.0,
		get_gesture_pinch_angle_delta: () => params.pinch_angle_delta ?? 0,
	};
}

let proxy: typeof DBusWrapperGIExtension.prototype | undefined;
let connectedSignalIds: number[] = [];

export function subscribe(callback: (actor: never | undefined, event: CustomEventType) => boolean): void {
	if (!proxy) {
		printStack('starting dbus service \'gesture_improvements_gesture_daemon.service\' via spawn');
		Util.spawn(['systemctl', '--user', 'start', 'gesture_improvements_gesture_daemon.service']);
		connectedSignalIds = [];
		proxy = new DBusWrapperGIExtension();
	}

	connectedSignalIds.push(
		proxy.connect('TouchpadSwipe', (_source, sphase, fingers, dx, dy, time) => {
			const event = GenerateEvent(Clutter.EventType.TOUCHPAD_SWIPE, sphase, fingers, time, { dx, dy });
			return callback(undefined, event);
		}),
	);

	connectedSignalIds.push(
		proxy.connect('TouchpadHold', (_source, sphase, fingers, time, is_cancelled) => {
			const event = GenerateEvent(Clutter.EventType.TOUCHPAD_HOLD, sphase, fingers, time, { is_cancelled });
			return callback(undefined, event);
		}),
	);

	connectedSignalIds.push(
		proxy.connect('TouchpadPinch', (_source, sphase, fingers, pinch_angle_delta, pinch_scale, time) => {
			const event = GenerateEvent(Clutter.EventType.TOUCHPAD_PINCH, sphase, fingers, time, { pinch_angle_delta, pinch_scale });
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
		Util.spawn(['systemctl', '--user', 'stop', 'gesture_improvements_gesture_daemon.service']);
	}
}