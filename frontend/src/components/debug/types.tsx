export type cartridgeDeviceDataType = {
    id: string,
    daysUsed: number,
    totalPumped: number,
    cartridgesUsed: number
}

export type CartridgeData = {
    cartridgeId: string, 
    cartridgeCount: number,
    currentStock: number,
    avgDemand: number,
    days: number,
    devices: Array<cartridgeDeviceDataType>
};