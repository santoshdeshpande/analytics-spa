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
                        "simplePredicate": {
                          "field": "yoj",
                          "operator": "greaterOrEqual",
                          "value": "4.8"
                        },
                        "scoreDistribution": [
                          {
                            "value": "0",
                            "recordCount": "725",
                            "confidence": "0.634851138353765"
                          },
                          {
                            "value": "1",
                            "recordCount": "417",
                            "confidence": "0.365148861646235"
                          }
                        ],
                        "children": [
                          {
                            "id": "32",
                            "score": "0",
                            "recordCount": "1130",
                            "defaultChild": "64",
                            "simplePredicate": {
                              "field": "clno",
                              "operator": "lessThan",
                              "value": "56.5"
                            },
                            "scoreDistribution": [
                              {
                                "value": "0",
                                "recordCount": "725",
                                "confidence": "0.641592920353982"
                              },
                              {
                                "value": "1",
                                "recordCount": "405",
                                "confidence": "0.358407079646018"
                              }
                            ],
                            "children": [
                              {
                                "id": "64",
                                "score": "0",
                                "recordCount": "687",
                                "simplePredicate": {
                                  "field": "loan",
                                  "operator": "greaterOrEqual",
                                  "value": "15050"
                                },
                                "scoreDistribution": [
                                  {
                                    "value": "0",
                                    "recordCount": "477",
                                    "confidence": "0.694323144104803"
                                  },
                                  {
                                    "value": "1",
                                    "recordCount": "210",
                                    "confidence": "0.305676855895196"
                                  }
                                ]
                              },
                              {
                                "id": "65",
                                "score": "0",
                                "recordCount": "443",
                                "defaultChild": "130",
                                "simplePredicate": {
                                  "field": "loan",
                                  "operator": "lessThan",
                                  "value": "15050"
                                },
                                "scoreDistribution": [
                                  {
                                    "value": "0",
                                    "recordCount": "248",
                                    "confidence": "0.559819413092551"
                                  },
                                  {
                                    "value": "1",
                                    "recordCount": "195",
                                    "confidence": "0.440180586907449"
                                  }
                                ],
                                "children": [
                                  {
                                    "id": "130",
                                    "score": "0",
                                    "recordCount": "409",
                                    "simplePredicate": {
                                      "field": "loan",
                                      "operator": "lessThan",
                                      "value": "14950"
                                    },
                                    "scoreDistribution": [
                                      {
                                        "value": "0",
                                        "recordCount": "245",
                                        "confidence": "0.599022004889976"
                                      },
                                      {
                                        "value": "1",
                                        "recordCount": "164",
                                        "confidence": "0.400977995110024"
                                      }
                                    ]
                                  },
                                  {
                                    "id": "131",
                                    "score": "1",
                                    "recordCount": "34",
                                    "simplePredicate": {
                                      "field": "loan",
                                      "operator": "greaterOrEqual",
                                      "value": "14950"
                                    },
                                    "scoreDistribution": [
                                      {
                                        "value": "0",
                                        "recordCount": "3",
                                        "confidence": "0.0882352941176471"
                                      },
                                      {
                                        "value": "1",
                                        "recordCount": "31",
                                        "confidence": "0.911764705882353"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "id": "33",
                            "score": "1",
                            "recordCount": "12",
                            "simplePredicate": {
                              "field": "clno",
                              "operator": "greaterOrEqual",
                              "value": "56.5"
                            },
                            "scoreDistribution": [
                              {
                                "value": "0",
                                "recordCount": "0",
                                "confidence": "0"
                              },
                              {
                                "value": "1",
                                "recordCount": "12",
                                "confidence": "1"
                              }
                            ]
                          }
                        ]
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
                              "Array": "\"Office\""
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
                              "Array": "\"Mgr\" \"Other\" \"ProfExe\" \"Sales\" \"Self\""
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
                    "simplePredicate": {
                      "field": "clno",
                      "operator": "lessThan",
                      "value": "2.5"
                    },
                    "scoreDistribution": [
                      {
                        "value": "0",
                        "recordCount": "1",
                        "confidence": "0.027027027027027"
                      },
                      {
                        "value": "1",
                        "recordCount": "36",
                        "confidence": "0.972972972972973"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "5",
                "score": "1",
                "recordCount": "366",
                "simplePredicate": {
                  "field": "inquiries",
                  "operator": "greaterOrEqual",
                  "value": "2.5"
                },
                "scoreDistribution": [
                  {
                    "value": "0",
                    "recordCount": "120",
                    "confidence": "0.327868852459016"
                  },
                  {
                    "value": "1",
                    "recordCount": "246",
                    "confidence": "0.672131147540984"
                  }
                ]
              }
            ]
          },
          {
            "id": "3",
            "score": "1",
            "recordCount": "313",
            "simplePredicate": {
              "field": "loan",
              "operator": "lessThan",
              "value": "7550"
            },
            "scoreDistribution": [
              {
                "value": "0",
                "recordCount": "84",
                "confidence": "0.268370607028754"
              },
              {
                "value": "1",
                "recordCount": "229",
                "confidence": "0.731629392971246"
              }
            ]
          }
        ]
      }
    };

  }];
});
