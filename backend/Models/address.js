import addressTypeEnum from "../enum/addressTypeEnum.js";

class Address{
    constructor(addressType, country, city, state, district, street, others) {
        //no values inserted -> throw an exception
        if (!addressType || !country || !city || !district || !street) {
            throw new Error("Missing required address fields");
        }
        if (!Object.values(addressTypeEnum).includes(addressType)) {
            throw new Error(`Invalid address type: ${addressType}`);
        }
        this.addressType = addressType;
        this.country = country;
        this.city = city;
        this.state = state;
        this.district = district;
        this.street = street;
        this.others = others || null;
    }
}

export default Address;