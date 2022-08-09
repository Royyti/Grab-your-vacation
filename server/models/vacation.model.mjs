
class VacationModel {
    id;
    description;
    destination;
    picture;
    dateFrom;
    dateTo;
    price;
    followers;

    /**
     * 
     * @param {number} id 
     * @param {string} description 
     * @param {string} destination 
     * @param {string} picture 
     * @param {Date} dateFrom 
     * @param {Date} dateTo 
     * @param {number} price 
     * @param {number} followers 
     */
    constructor(id, description, destination, picture, dateFrom, dateTo, price, followers) {
        this.id = id;
        this.description = description;
        this.destination = destination;
        this.picture = picture;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.price = price;
        this.followers = followers;


    }
}

export { VacationModel }
