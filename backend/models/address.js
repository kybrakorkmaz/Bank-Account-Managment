class Address{
    constructor(addressType, country, city, state, district, street, others) {
        this.addressType = addressType;
        this.country = country;
        this.city = city;
        this.state = state;
        this.district = district || null;
        this.street = street;
        this.others = others || null;
    }
}

export default Address;