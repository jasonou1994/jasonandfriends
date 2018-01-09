<?php
/**
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen
 * Do not edit the class manually.
 */

namespace SquareConnect\Model;

use \ArrayAccess;
/**
 * V1Variation Class Doc Comment
 *
 * @category Class
 * @package  SquareConnect
 * @author   Square Inc.
 * @license  http://www.apache.org/licenses/LICENSE-2.0 Apache Licene v2
 * @link     https://squareup.com/developers
 */
class V1Variation implements ArrayAccess
{
    /**
      * Array of property to type mappings. Used for (de)serialization 
      * @var string[]
      */
    static $swaggerTypes = array(
        'id' => 'string',
        'name' => 'string',
        'item_id' => 'string',
        'pricing_type' => 'string',
        'price_money' => '\SquareConnect\Model\V1Money',
        'sku' => 'string',
        'track_inventory' => 'bool',
        'inventory_alert_type' => 'string',
        'inventory_alert_threshold' => 'int',
        'user_data' => 'string'
    );
  
    /** 
      * Array of attributes where the key is the local name, and the value is the original name
      * @var string[] 
      */
    static $attributeMap = array(
        'id' => 'id',
        'name' => 'name',
        'item_id' => 'item_id',
        'pricing_type' => 'pricing_type',
        'price_money' => 'price_money',
        'sku' => 'sku',
        'track_inventory' => 'track_inventory',
        'inventory_alert_type' => 'inventory_alert_type',
        'inventory_alert_threshold' => 'inventory_alert_threshold',
        'user_data' => 'user_data'
    );
  
    /**
      * Array of attributes to setter functions (for deserialization of responses)
      * @var string[]
      */
    static $setters = array(
        'id' => 'setId',
        'name' => 'setName',
        'item_id' => 'setItemId',
        'pricing_type' => 'setPricingType',
        'price_money' => 'setPriceMoney',
        'sku' => 'setSku',
        'track_inventory' => 'setTrackInventory',
        'inventory_alert_type' => 'setInventoryAlertType',
        'inventory_alert_threshold' => 'setInventoryAlertThreshold',
        'user_data' => 'setUserData'
    );
  
    /**
      * Array of attributes to getter functions (for serialization of requests)
      * @var string[]
      */
    static $getters = array(
        'id' => 'getId',
        'name' => 'getName',
        'item_id' => 'getItemId',
        'pricing_type' => 'getPricingType',
        'price_money' => 'getPriceMoney',
        'sku' => 'getSku',
        'track_inventory' => 'getTrackInventory',
        'inventory_alert_type' => 'getInventoryAlertType',
        'inventory_alert_threshold' => 'getInventoryAlertThreshold',
        'user_data' => 'getUserData'
    );
  
    /**
      * $id The item variation's unique ID.
      * @var string
      */
    protected $id;
    /**
      * $name The item variation's name.
      * @var string
      */
    protected $name;
    /**
      * $item_id The ID of the variation's associated item.
      * @var string
      */
    protected $item_id;
    /**
      * $pricing_type Indicates whether the item variation's price is fixed or determined at the time of sale.
      * @var string
      */
    protected $pricing_type;
    /**
      * $price_money The item variation's price, if any.
      * @var \SquareConnect\Model\V1Money
      */
    protected $price_money;
    /**
      * $sku The item variation's SKU, if any.
      * @var string
      */
    protected $sku;
    /**
      * $track_inventory If true, inventory tracking is active for the variation.
      * @var bool
      */
    protected $track_inventory;
    /**
      * $inventory_alert_type Indicates whether the item variation displays an alert when its inventory quantity is less than or equal to its inventory_alert_threshold.
      * @var string
      */
    protected $inventory_alert_type;
    /**
      * $inventory_alert_threshold If the inventory quantity for the variation is less than or equal to this value and inventory_alert_type is LOW_QUANTITY, the variation displays an alert in the merchant dashboard.
      * @var int
      */
    protected $inventory_alert_threshold;
    /**
      * $user_data Arbitrary metadata associated with the variation. Cannot exceed 255 characters.
      * @var string
      */
    protected $user_data;

    /**
     * Constructor
     * @param mixed[] $data Associated array of property value initalizing the model
     */
    public function __construct(array $data = null)
    {
        if ($data != null) {
            if (isset($data["id"])) {
              $this->id = $data["id"];
            } else {
              $this->id = null;
            }
            if (isset($data["name"])) {
              $this->name = $data["name"];
            } else {
              $this->name = null;
            }
            if (isset($data["item_id"])) {
              $this->item_id = $data["item_id"];
            } else {
              $this->item_id = null;
            }
            if (isset($data["pricing_type"])) {
              $this->pricing_type = $data["pricing_type"];
            } else {
              $this->pricing_type = null;
            }
            if (isset($data["price_money"])) {
              $this->price_money = $data["price_money"];
            } else {
              $this->price_money = null;
            }
            if (isset($data["sku"])) {
              $this->sku = $data["sku"];
            } else {
              $this->sku = null;
            }
            if (isset($data["track_inventory"])) {
              $this->track_inventory = $data["track_inventory"];
            } else {
              $this->track_inventory = null;
            }
            if (isset($data["inventory_alert_type"])) {
              $this->inventory_alert_type = $data["inventory_alert_type"];
            } else {
              $this->inventory_alert_type = null;
            }
            if (isset($data["inventory_alert_threshold"])) {
              $this->inventory_alert_threshold = $data["inventory_alert_threshold"];
            } else {
              $this->inventory_alert_threshold = null;
            }
            if (isset($data["user_data"])) {
              $this->user_data = $data["user_data"];
            } else {
              $this->user_data = null;
            }
        }
    }
    /**
     * Gets id
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }
  
    /**
     * Sets id
     * @param string $id The item variation's unique ID.
     * @return $this
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    /**
     * Gets name
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }
  
    /**
     * Sets name
     * @param string $name The item variation's name.
     * @return $this
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }
    /**
     * Gets item_id
     * @return string
     */
    public function getItemId()
    {
        return $this->item_id;
    }
  
    /**
     * Sets item_id
     * @param string $item_id The ID of the variation's associated item.
     * @return $this
     */
    public function setItemId($item_id)
    {
        $this->item_id = $item_id;
        return $this;
    }
    /**
     * Gets pricing_type
     * @return string
     */
    public function getPricingType()
    {
        return $this->pricing_type;
    }
  
    /**
     * Sets pricing_type
     * @param string $pricing_type Indicates whether the item variation's price is fixed or determined at the time of sale.
     * @return $this
     */
    public function setPricingType($pricing_type)
    {
        $this->pricing_type = $pricing_type;
        return $this;
    }
    /**
     * Gets price_money
     * @return \SquareConnect\Model\V1Money
     */
    public function getPriceMoney()
    {
        return $this->price_money;
    }
  
    /**
     * Sets price_money
     * @param \SquareConnect\Model\V1Money $price_money The item variation's price, if any.
     * @return $this
     */
    public function setPriceMoney($price_money)
    {
        $this->price_money = $price_money;
        return $this;
    }
    /**
     * Gets sku
     * @return string
     */
    public function getSku()
    {
        return $this->sku;
    }
  
    /**
     * Sets sku
     * @param string $sku The item variation's SKU, if any.
     * @return $this
     */
    public function setSku($sku)
    {
        $this->sku = $sku;
        return $this;
    }
    /**
     * Gets track_inventory
     * @return bool
     */
    public function getTrackInventory()
    {
        return $this->track_inventory;
    }
  
    /**
     * Sets track_inventory
     * @param bool $track_inventory If true, inventory tracking is active for the variation.
     * @return $this
     */
    public function setTrackInventory($track_inventory)
    {
        $this->track_inventory = $track_inventory;
        return $this;
    }
    /**
     * Gets inventory_alert_type
     * @return string
     */
    public function getInventoryAlertType()
    {
        return $this->inventory_alert_type;
    }
  
    /**
     * Sets inventory_alert_type
     * @param string $inventory_alert_type Indicates whether the item variation displays an alert when its inventory quantity is less than or equal to its inventory_alert_threshold.
     * @return $this
     */
    public function setInventoryAlertType($inventory_alert_type)
    {
        $this->inventory_alert_type = $inventory_alert_type;
        return $this;
    }
    /**
     * Gets inventory_alert_threshold
     * @return int
     */
    public function getInventoryAlertThreshold()
    {
        return $this->inventory_alert_threshold;
    }
  
    /**
     * Sets inventory_alert_threshold
     * @param int $inventory_alert_threshold If the inventory quantity for the variation is less than or equal to this value and inventory_alert_type is LOW_QUANTITY, the variation displays an alert in the merchant dashboard.
     * @return $this
     */
    public function setInventoryAlertThreshold($inventory_alert_threshold)
    {
        $this->inventory_alert_threshold = $inventory_alert_threshold;
        return $this;
    }
    /**
     * Gets user_data
     * @return string
     */
    public function getUserData()
    {
        return $this->user_data;
    }
  
    /**
     * Sets user_data
     * @param string $user_data Arbitrary metadata associated with the variation. Cannot exceed 255 characters.
     * @return $this
     */
    public function setUserData($user_data)
    {
        $this->user_data = $user_data;
        return $this;
    }
    /**
     * Returns true if offset exists. False otherwise.
     * @param  integer $offset Offset 
     * @return boolean
     */
    public function offsetExists($offset)
    {
        return isset($this->$offset);
    }
  
    /**
     * Gets offset.
     * @param  integer $offset Offset 
     * @return mixed 
     */
    public function offsetGet($offset)
    {
        return $this->$offset;
    }
  
    /**
     * Sets value based on offset.
     * @param  integer $offset Offset 
     * @param  mixed   $value  Value to be set
     * @return void
     */
    public function offsetSet($offset, $value)
    {
        $this->$offset = $value;
    }
  
    /**
     * Unsets offset.
     * @param  integer $offset Offset 
     * @return void
     */
    public function offsetUnset($offset)
    {
        unset($this->$offset);
    }
  
    /**
     * Gets the string presentation of the object
     * @return string
     */
    public function __toString()
    {
        if (defined('JSON_PRETTY_PRINT')) {
            return json_encode(\SquareConnect\ObjectSerializer::sanitizeForSerialization($this), JSON_PRETTY_PRINT);
        } else {
            return json_encode(\SquareConnect\ObjectSerializer::sanitizeForSerialization($this));
        }
    }
}
