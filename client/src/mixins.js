const Mixins = {

  methods: {

    /**
     * Get a month in a date to be 2 digits long instead of either 1 or 2
     * @param {Date} date 
     * @returns {String} a 2 digit long string to represent the month
     */
    determineMonth(fullDate) {
      let month = (new Date(fullDate)).getMonth() + 1;
      if (month < 10) return `0${month}`;
      return `${month}`
    },

    /**
     * Get a date in a date to be 2 digits long instead of either 1 or 2
     * @param {Date} date 
     * @returns {String} a 2 digit long string to represent the date
     */
    determineDate(fullDate) {
      let date = (new Date(fullDate)).getDate() + 1;
      if (date < 10) return `0${date}`;
      return `${date}`
    }

  }

  
}

export {
  Mixins
}