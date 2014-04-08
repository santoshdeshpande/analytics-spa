/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return  ['$scope', '$stateParams', function ($scope, $stateParams) {

    $scope.data = {
      "root": {
        "id": "1",
        "score": "0",
        "recordCount": "2378",
        "defaultChild": "2",
        "scoreDistribution": [
          {
            "value": "0",
            "recordCount": "1189",
            "confidence": "0.5"
          },
          {
            "value": "1",
            "recordCount": "1189",
            "confidence": "0.5"
          }
        ],
        "children": [
          {
            "id": "2",
            "score": "0",
            "recordCount": "2065",
            "defaultChild": "4",
            "simplePredicate": {
              "field": "loan",
              "operator": "greaterOrEqual",
              "value": "7550"
            },
            "scoreDistribution": [
              {
                "value": "0",
                "recordCount": "1105",
                "confidence": "0.535108958837772"
              },
              {
                "value": "1",
                "recordCount": "960",
                "confidence": "0.464891041162228"
              }
            ],
            "children": [
              {
                "id": "4",
                "score": "0",
                "recordCount": "1699",
                "defaultChild": "8",
                "simplePredicate": {
                  "field": "inquiries",
                  "operator": "lessThan",
                  "value": "2.5"
                },
                "scoreDistribution": [
                  {
                    "value": "0",
                    "recordCount": "985",
                    "confidence": "0.579752795762213"
                  },
                  {
                    "value": "1",
                    "recordCount": "714",
                    "confidence": "0.420247204237787"
                  }
                ],
                "children": [
                  {
                    "id": "8",
                    "score": "0",
                    "recordCount": "1662",
                    "defaultChild": "16",
                    "simplePredicate": {
                      "field": "clno",
                      "operator": "greaterOrEqual",
                      "value": "2.5"
                    },
                    "scoreDistribution": [
                      {
                        "value": "0",
                        "recordCount": "984",
                        "confidence": "0.592057761732852"
                      },
                      {
                        "value": "1",
                        "recordCount": "678",
                        "confidence": "0.407942238267148"
                      }
                    ],
                    "children": [
                      {
                        "id": "16",
                        "score": "0",
                        "recordCount": "1142",
                        "defaultChild": "32",
                        "text": "..."
                      },
                      {
                        "id": "17",
                        "score": "1",
                        "recordCount": "520",
                        "defaultChild": "34",
                        "simplePredicate": {
                          "field": "yoj",
                          "operator": "lessThan",
                          "value": "4.8"
                        },
                        "scoreDistribution": [
                          {
                            "value": "0",
                            "recordCount": "259",
                            "confidence": "0.498076923076923"
                          },
                          {
                            "value": "1",
                            "recordCount": "261",
                            "confidence": "0.501923076923077"
                          }
                        ],
                        "children": [
                          {
                            "id": "34",
                            "score": "0",
                            "recordCount": "106",
                            "SimpleSetPredicate": {
                              "field": "job",
                              "booleanOperator": "isIn",
                              "Array": {
                                "n": "1",
                                "text": "\"Office\""
                              }
                            },
                            "scoreDistribution": [
                              {
                                "value": "0",
                                "recordCount": "69",
                                "confidence": "0.650943396226415"
                              },
                              {
                                "value": "1",
                                "recordCount": "37",
                                "confidence": "0.349056603773585"
                              }
                            ]
                          },
                          {
                            "id": "35",
                            "score": "1",
                            "recordCount": "414",
                            "SimpleSetPredicate": {
                              "field": "job",
                              "booleanOperator": "isIn",
                              "text": "..."
                            },
                            "scoreDistribution": [
                              {
                                "value": "0",
                                "recordCount": "190",
                                "confidence": "0.458937198067633"
                              },
                              {
                                "value": "1",
                                "recordCount": "224",
                                "confidence": "0.541062801932367"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": "9",
                    "score": "1",
                    "recordCount": "37",
                    "text": "..."
                  }
                ]
              },
              {
                "id": "5",
                "score": "1",
                "recordCount": "366",
                "text": "..."
              }
            ]
          },
          {
            "id": "3",
            "score": "1",
            "recordCount": "313",
            "text": "..."
          }
        ]
      }
    };


    $scope.data_other = {
      "root": {
        "name": "loan",
        "info": "hello1",
        "recordCount": "2378",
        "scoreDistribution": [
          {
            "recordCount": 1189,
            "confidence": 0.5
          },
          {
            "recordCount": 1189,
            "confidence": 0.5
          }
        ]
      },
      "children": [

        {
          "name": "child a",
          "info": "hello2",
          "confidence": 0.5,
          "children": [
            {
              "name": "child aa",
              "confidence": 0.535108958837772,
              "info": "hello3",
              "children": {}
            },
            {
              "name": "child ab",
              "info": "hello4",
              "confidence": 0.535108958837772,
              "children": {}
            }
          ]
        },
        {
          "name": "child b",
          "info": "hello5",
          "confidence": 0.5,
          "children": [
            {
              "name": "child ba",
              "info": "hello6",
              "confidence": 0.535108958837772,
              "children": {}
            },
            {
              "name": "child bb",
              "info": "hello7",
              "confidence": 0.535108958837772,
              "children": {}
            }
          ]
        }

      ]
    }; // data

  }];
});
