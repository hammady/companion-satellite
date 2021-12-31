import EventEmitter = require('eventemitter3')
import { CompanionSatelliteClient } from '../client'

export type DeviceId = string

export interface DeviceDrawProps {
	deviceId: string
	keyIndex: number
	image?: Buffer
	color?: string // hex
	text?: string
}
export interface DeviceRegisterProps {
	keysTotal: number
	keysPerRow: number
	bitmaps: boolean
	colours: boolean
	text: boolean
}

export type WrappedDeviceEvents = {
	ready: [ready: boolean]
}

export interface WrappedDevice extends EventEmitter<WrappedDeviceEvents> {
	readonly deviceId: DeviceId
	readonly productName: string
	readonly ready: boolean

	getRegisterProps(): DeviceRegisterProps

	close(): Promise<void>

	initDevice(client: CompanionSatelliteClient, status: string): Promise<void>

	deviceAdded(): Promise<void>

	setBrightness(percent: number): Promise<void>

	blankDevice(): Promise<void>

	draw(data: DeviceDrawProps): Promise<void>

	showStatus(hostname: string, status: string): Promise<void>
}