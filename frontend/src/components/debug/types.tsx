export type CartridgeDeviceDataType = {
    id: string,
    daysUsed: number,
    totalPumped: number,
    cartridgesUsed: number
}

export type OrderInProgress = {
    cartridgeCount: number,
    createdTime: string,
    id: number
    sentOutTime: string
}

export type CartridgeData = {
    cartridgeId: string, 
    cartridgeName: string, 
    cartridgeUpdatedTime: Date,
    cartridgeCount: number,
    currentStock: number,
    avgDemand: number,
    days: number,
    devices: Array<CartridgeDeviceDataType>,
    ordersInProgress: Array<OrderInProgress>
};