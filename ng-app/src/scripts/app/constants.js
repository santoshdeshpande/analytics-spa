/* global
 define: false,
 console: false
 */
define([], function () {
  'use strict';

  return {
    KEY_PERFORMANCE_INDICATORS: [
      {"key": "average_squared_error", "label": "Average Squared Error", "min": 0, "max": 1, "comparator": "gt"},
      {"key": "area_under_the_curve", "label": "Area Under the Curve", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "true_positive_rate", "label": "True Positive Rate", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "true_negative_rate", "label": "True Negative Rate", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "false_positive_rate", "label": "False Positive Rate", "min": 0, "max": 1, "comparator": "gt"},
      {"key": "false_negative_rate", "label": "False Negative Rate", "min": 0, "max": 1, "comparator": "gt"},
      {"key": "sensitivity", "label": "Sensitivity", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "specificity", "label": "Specificity", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "accuracy", "label": "Accuracy", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "precision", "label": "Precision", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "negative_predictive_value", "label": "Negative Predictive Value", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "misclassification_rate", "label": "Misclassification Rate", "min": 0, "max": 1, "comparator": "gt"},
      {"key": "cumulative_captured_response_top_10", "label": "Cumulative Captured Response Top 10%", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "cumulative_captured_response_top_25", "label": "Cumulative Captured Response Top 25%", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "cumulative_lift_top_10", "label": "Cumulative Lift Top 10%", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "cumulative_lift_top_25", "label": "Cumulative Lift Top 25%", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "cumulative_response_top_10", "label": "Cumulative Response Top 10%", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "cumulative_response_top_25", "label": "Cumulative Response Top 25%", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "f_score", "label": "F-Score", "min": 0, "max": 1, "comparator": "lt"},
      {"key": "informedness", "label": "Informedness", "min": -1, "max": 1, "comparator": "lt"},
      {"key": "markedness", "label": "Markedness", "min": -1, "max": 1, "comparator": "lt"},
      {"key": "root_average_squared_error", "label": "Root Average Squared Error", "min": 0, "max": 1, "comparator": "gt"},
      {"key": "maximum_absolute_error", "label": "Maximum Absolute Error", "min": 0, "max": 1, "comparator": "gt"},
      {"key": "gini_coefficient", "label": "Gini Coefficient", "min": 0, "max": 1, "comparator": "lt"}
    ],
    DAYS_IN_MONTH: [
      {"key": 1, "label": "1st"},
      {"key": 2, "label": "2nd"},
      {"key": 3, "label": "3rd"},
      {"key": 4, "label": "4th"},
      {"key": 5, "label": "5th"},
      {"key": 6, "label": "6th"},
      {"key": 7, "label": "7th"},
      {"key": 8, "label": "8th"},
      {"key": 9, "label": "9th"},
      {"key": 10, "label": "10th"},
      {"key": 11, "label": "11th"},
      {"key": 12, "label": "12th"},
      {"key": 13, "label": "13th"},
      {"key": 14, "label": "14th"},
      {"key": 15, "label": "15th"},
      {"key": 16, "label": "16th"},
      {"key": 17, "label": "17th"},
      {"key": 18, "label": "18th"},
      {"key": 19, "label": "19th"},
      {"key": 20, "label": "20th"},
      {"key": 21, "label": "21st"},
      {"key": 22, "label": "22nd"},
      {"key": 23, "label": "23rd"},
      {"key": 24, "label": "24th"},
      {"key": 25, "label": "25th"},
      {"key": 26, "label": "26th"},
      {"key": 27, "label": "27th"},
      {"key": 28, "label": "28th"}
    ]
  }

});
