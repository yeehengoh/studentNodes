'use strict'

var csc = require("country-state-city");

var countryList = JSON.parse(csc.default.getAllCountries());

window.onload = function () {

    //Get html elements
    var countySel = document.getElementById("country");
    var stateSel = document.getElementById("state");
    var citySel = document.getElementById("city");

    //Load countries
    for (var country in countryList) {
        countySel.options[countySel.options.length] = new Option(country.name, country.id);
    }

    //County Changed
    countySel.onchange = function () {

        stateSel.length = 1; // remove all options bar first
        citySel.length = 1; // remove all options bar first

        if (this.selectedIndex < 1)
            return; // done

        var stateList = JSON.parse(csc.default.getStatesOfCountry(countrySel.value));

        for (var state in stateList) {
            stateSel.options[stateSel.options.length] = new Option(state.name, state.id);
        }
    }

    //State Changed
    stateSel.onchange = function () {

        citySel.length = 1; // remove all options bar first

        if (this.selectedIndex < 1)
            return; // done

        var cityList = JSON.parse(csc.default.getCitiesOfState(stateSel.value));

        for (var city in cityList) {
            citySel.options[citySel.options.length] = new Option(city.name, city.id);
        }
    }
}