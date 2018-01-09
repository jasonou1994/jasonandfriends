# Order

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | The order&#39;s unique ID.  This value is not present if the order was not created with the [CreateOrder](#endpoint-createorder) endpoint. | [optional] 
**location_id** | **string** | The ID of the merchant location this order is associated with. | [optional] 
**reference_id** | **string** | A client specified identifier to associate an entity in another system with this order. | [optional] 
**line_items** | [**\SquareConnect\Model\OrderLineItem[]**](OrderLineItem.md) | The line items included in the order. Every order has at least one line item. | [optional] 
**total_money** | [**\SquareConnect\Model\Money**](Money.md) | The total amount of money to collect for the order. | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


