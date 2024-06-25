import { Component } from '@angular/core';

/**
 * 
 * @param array - Array to transform in such way to access data without index
 * @param keyName - keyName to 
 * @returns 
 */
const transformArray = (array: Array<Object>, keyName: string) => array.reduce((accumulator: Object, currentValue: any) => { 
  return { 
      ...accumulator, 
      [currentValue[keyName]]: currentValue, 
  } 
}, {});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-json-schema-form-playground';
  builderReadFormat = "{{ terminal .currencies[3].symbol }}"

  formState: any = {};
  formStateString = ""

  transformedFormState: any = {};
  transformedFormStateString = "";

  schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "currencies": {
        "title": "Currencies",
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "isoName": {
              "type": "string"
            },
            "symbol": {
              "type": "string"
            },
            "prefix": {
              "type": "boolean"
            },
            "cashTxMaxAmount": {
              "type": "integer"
            },
            "fastCashAmounts": {
              "type": "array",
              "items": {
                "type": "integer"
              }
            }
          },
          "required": [
            "cashTxMaxAmount",
            "fastCashAmounts",
            "isoName",
            "prefix",
            "symbol"
          ]
        }
      }
    }
  }

  sample = {
    "currencies": [
      {
        "isoName": "EUR",
        "symbol": "%E2%82%AC",
        "prefix": true,
        "cashTxMaxAmount": 40000,
        "fastCashAmounts": [
          5,
          10,
          20,
          50,
          100,
          200,
        ]
      },
      {
        "isoName": "USD",
        "symbol": "$",
        "prefix": true,
        "cashTxMaxAmount": 4000000,
        "fastCashAmounts": [
          10,
          50,
          20,
          15,
          100,
          200
        ]
      },
    ]
  }

  layout = [
    {
      "key": "currencies",
      "type": "tabarray",
      "title": "{{ value.isoName || 'new' }}",
      "items": [{
        "type": "section",
        "displayFlex": true,
        "flex-direction": "row",
        "flex-wrap": "wrap",
        "items": [
          {
            "key": "currencies[].isoName",
            "notitle": false
          },
          {
            "key": "currencies[].symbol",
            "notitle": false
          },
          {
            "key": "currencies[].prefix",
            "notitle": false,
            "type": "select",
            "titleMap": {
              "true": true,
              "false": false
            }
          },
          {
            "key": "currencies[].cashTxMaxAmount",
            "notitle": false
          },
          {
            "key": "currencies[].fastCashAmounts",
            "notitle": true,
            "type": "array",
            "displayFlex": true,
            "flex-direction": "row",
            "items": [
              {
                "key": "currencies[].fastCashAmounts[]",
                "notitle": false
              }
            ]
          }
        ]
      }]
    }
  ]

  

  onFormSubmit(event: any) {
    console.log('event:', event)

    this.formState = event;
    this.formStateString = JSON.stringify(event);

    this.transformedFormState = {
      currencies: transformArray(event.currencies, "isoName")
    }
    this.transformedFormStateString = JSON.stringify(this.transformedFormState);
  }
}