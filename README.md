# Usage:
* set how many months should be able to be selected in [customFlatPickr](https://github.com/philipphermes/DateTimePicker/blob/main/customFlatPickr.js) (monthAz)
* include these in your html file:
  * header:
    * ```html
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
      ```
    * Themes:
      * ```html
          <link rel="stylesheet" type="text/css" href="https://npmcdn.com/flatpickr/dist/themes/dark.css">
        ```
      * more styles can be found [here](https://flatpickr.js.org/themes/)
  * bottom of body:
    * ```html
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
        <script src="https://unpkg.com/flatpickr@4.6.9/dist/plugins/minMaxTimePlugin.js"></script>
        <script src="customFlatPickr.js"></script>
      ```
* form requires this input:
  * ```html
      <input type="datetime-local">
    ```
* dependencies:
  * [flatpickt](https://flatpickr.js.org/)
  * [feiertage Api](https://ipty.de/feiertag/)