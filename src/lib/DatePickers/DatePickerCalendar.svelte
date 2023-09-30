<script lang="ts">
  import { onMount, tick, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { getDateObjFromISODate, getISODateFromDateObj, isValidDate } from "./utils";

  export let value = "";
  export let top = 0;
  export let left = 0;

  const dispatch = createEventDispatcher();
  $: dispatch("change", value);

  let focusDay = value;
  // If the value that the user enters into the input field is an empty string or is not a valid date, then set `focusDay` to today's date so the calendar will display properly.
  // NOTE: An empty date field is a valid input.
  $: {
    if (value === "" || !isValidDate(focusDay)) {
      focusDay = getISODateFromDateObj(new Date());
    }
  }

  let cancelBtn;
  let okBtn;
  let nextYearBtn;

  let monthYearHeading = "";
  let dialogMessage = "Cursor keys can navigate dates";

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dates = [];
  // The dates array will have 6 nested arrays, each representing one week.
  // Each nested week array will have 7 objects, each representing a date.
  // This is an example:
  // let dates = [
  //   [
  //     { date: "2020-01-26", day: 26, disabled: true },
  //     { date: "2020-01-27", day: 27, disabled: true },
  //     { date: "2020-01-28", day: 28, disabled: true },
  //     { date: "2020-01-29", day: 29, disabled: true },
  //     { date: "2020-01-30", day: 30, disabled: true },
  //     { date: "2020-01-31", day: 31, disabled: true },
  //     { date: "2020-02-01", day: 1, disabled: false },
  //   ],
  //   [
  //     { date: "2020-02-02", day: 2, disabled: false },
  //     { date: "2020-02-03", day: 3, disabled: false },
  //     { date: "2020-02-04", day: 4, disabled: false },
  //     { date: "2020-02-05", day: 5, disabled: false },
  //     { date: "2020-02-06", day: 6, disabled: false },
  //     { date: "2020-02-07", day: 7, disabled: false },
  //     { date: "2020-02-08", day: 8, disabled: false },
  //   ],
  //   [
  //     { date: "2020-02-09", day: 9, disabled: false },
  //     { date: "2020-02-10", day: 10, disabled: false },
  //     { date: "2020-02-11", day: 11, disabled: false },
  //     { date: "2020-02-12", day: 12, disabled: false },
  //     { date: "2020-02-13", day: 13, disabled: false },
  //     { date: "2020-02-14", day: 14, disabled: false },
  //     { date: "2020-02-15", day: 15, disabled: false },
  //   ],
  //   [
  //     { date: "2020-02-16", day: 16, disabled: false },
  //     { date: "2020-02-17", day: 17, disabled: false },
  //     { date: "2020-02-18", day: 18, disabled: false },
  //     { date: "2020-02-19", day: 19, disabled: false },
  //     { date: "2020-02-20", day: 20, disabled: false },
  //     { date: "2020-02-21", day: 21, disabled: false },
  //     { date: "2020-02-22", day: 22, disabled: false },
  //   ],
  //   [
  //     { date: "2020-02-23", day: 23, disabled: false },
  //     { date: "2020-02-24", day: 24, disabled: false },
  //     { date: "2020-02-25", day: 25, disabled: false },
  //     { date: "2020-02-26", day: 26, disabled: false },
  //     { date: "2020-02-27", day: 27, disabled: false },
  //     { date: "2020-02-28", day: 28, disabled: false },
  //     { date: "2020-02-29", day: 29, disabled: false },
  //   ],
  //   [
  //     { date: "2020-03-01", day: 1, disabled: true },
  //     { date: "2020-03-02", day: 2, disabled: true },
  //     { date: "2020-03-03", day: 3, disabled: true },
  //     { date: "2020-03-04", day: 4, disabled: true },
  //     { date: "2020-03-05", day: 5, disabled: true },
  //     { date: "2020-03-06", day: 6, disabled: true },
  //     { date: "2020-03-07", day: 7, disabled: true },
  //   ],
  // ];

  onMount(() => {
    updateCalendar();
    setFocusDay();
  });

  // This function is used to update the dates, the selected date (i.e. the `value`), and the focused date in the calendar.
  function updateCalendar() {
    const fd = getDateObjFromISODate(focusDay);

    monthYearHeading = `${monthLabels[fd.getMonth()]} ${fd.getFullYear()}`;

    // Create a Date object with the first day of the current month.
    let firstDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 1);
    // Get the day of the week as a number. 0 represents Sunday.
    let dayOfWeek = firstDayOfMonth.getDay();

    // Get the date of the Sunday that is before the first day of the month and set `firstDayOfMonth` to that date. If the first day of the month is a Sunday, then `firstDayOfMonth` will remain that date.
    // Get the first day of the month as a number. Subtract the day of the week (which is a number) from the first day of the month. `setDate()` is the opposite of the `getDate()` - it will set, or change, the date of the Date object it is referencing. If the date that is being set is before or after the month in the Date object, then the month in the Date object will also be changed.
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() - dayOfWeek);

    // Create a new Date object that represents the Sunday that is before the first day of the month.
    const d = new Date(firstDayOfMonth);

    // Clear the `dates` array.
    dates.length = 0;

    // This for loop will populate the `dates` array with up to 6 nested arrays (representing the weeks of the month) and each nested array will have 7 calendar date objects (representing the days of the week). 
    // NOTE: If there are no dates in the 6th week of the month, then there will only be 5 nested week arrays.
    for (let i = 0; i < 6; i++) {
      dates.push([]);
      for (let j = 0; j < 7; j++) {
        // If this is the 6th week of the month and the first day of this 6th week is in the following month, then remove the last nested array, which was just inserted and is empty, and break out of the loop so no other dates will be populated.
        if (i === 5 && j === 0 && d.getMonth() !== fd.getMonth()) {
          dates.pop();
          break;
        }
        // Else, push the calendar date objects to the nested week array.
        else {
          dates[i].push({ 
            date: getISODateFromDateObj(d),
            day: d.getDate(),
            // If the date is not in the current month, then set `disabled` to true.
            disabled: d.getMonth() !== fd.getMonth(),
          });
          // Update the date to be next day so the entire calendar of dates will be populated.
          d.setDate(d.getDate() + 1);
        }
      }
    }
  }

  async function setFocusDay() {
    await tick();
    const focusedDay = document.querySelector('td[tabindex="0"]');
    focusedDay.focus();
  }

  function handleDayClick(day) {
    value = day.date;
    dispatch("hideDialog");
  }

  async function handleDayKeyDown(event, day, weekIndex, dayIndex) {
    let preventDefaultEvents = false;
    let shouldSetFocusDay = true;

    switch (event.key) {
      case "Esc":
      case "Escape":
        dispatch("hideDialog");
        break;

      case " ":
        focusDay = day.date;
        preventDefaultEvents = true;
        break;

      case "Enter":
        value = day.date;
        dispatch("hideDialog");
        preventDefaultEvents = true;
        break;

      case "Tab":
        cancelBtn.focus();
        if (event.shiftKey) {
          nextYearBtn.focus();
        }
        dialogMessage = "";
        preventDefaultEvents = true;
        shouldSetFocusDay = false;
        break;

      case "Right":
      case "ArrowRight":
        moveFocusToNextDay(day, weekIndex, dayIndex);
        preventDefaultEvents = true;
        break;

      case "Left":
      case "ArrowLeft":
        moveFocusToPreviousDay(day, weekIndex, dayIndex);
        preventDefaultEvents = true;
        break;

      case "Down":
      case "ArrowDown":
        moveFocusToNextWeek(day, weekIndex, dayIndex);
        preventDefaultEvents = true;
        break;

      case "Up":
      case "ArrowUp":
        moveFocusToPreviousWeek(day, weekIndex, dayIndex);
        preventDefaultEvents = true;
        break;

      case "Home":
        moveFocusToFirstDayOfWeek(weekIndex);
        preventDefaultEvents = true;
        break;

      case "End":
        moveFocusToLastDayOfWeek(weekIndex);
        preventDefaultEvents = true;
        break;

      case "PageUp":
        if (event.shiftKey) {
          moveToPreviousYear(day.date);
        } 
        else {
          moveToPreviousMonth(day.date);
        }
        preventDefaultEvents = true;
        break;

      case "PageDown":
        if (event.shiftKey) {
          moveToNextYear(day.date);
        }
        else {
          moveToNextMonth(day.date);
        }
        preventDefaultEvents = true;
        break;
    }

    // Put the focus on the newly selected date.
    if (shouldSetFocusDay) {
      setFocusDay();
    }

    if (preventDefaultEvents) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  async function moveFocusToNextDay(day, weekIndex, dayIndex) {    
    // If the weekIndex is the last row in the calendar and the next day is the first day of the next month (i.e. the focused day is the last day of the month, but the next day on the calendar is disabled because it is the first day of the next month), then set the `value` to be the first day of the next month and update the calendar to the next month.
    if (weekIndex === dates.length - 1 && dates[weekIndex][dayIndex + 1]?.disabled) {
      focusDay = dates[weekIndex][dayIndex + 1].date;
      updateCalendar();
    }
    // If the weekIndex is the last row in the calendar and the dayIndex is the last day in the week (i.e. the focused day is the last day of the month and it is also the last day on the last row and last column in the calendar), then set the `value` to be the first day of the next month and update the calendar to the next month.
    else if (weekIndex === dates.length - 1 && dayIndex === 6) {
      const d = getDateObjFromISODate(day.date);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() + 1);
      focusDay = getISODateFromDateObj(d);
      updateCalendar();
    }
    // If the dayIndex is the last day in the week, then add 1 to the weekIndex and set the dayIndex to 0.
    else if (dayIndex === 6) {
      focusDay = dates[weekIndex + 1][0].date;
    }
    // Else set the value to the next date.
    else {
      focusDay = dates[weekIndex][dayIndex + 1].date;
    }
  }

  function moveFocusToPreviousDay(day, weekIndex, dayIndex) {    
    // If the weekIndex is the first row in the calendar and the previous day is the last day of the previous month (i.e. the focused day is the first day of the month, but the previous day on the calendar is disabled because it is the last day of the previous month), then set the `value` to be the last day of the previous month and update the calendar to the previous month.
    if (weekIndex === 0 && dates[weekIndex][dayIndex - 1]?.disabled) {
      focusDay = dates[weekIndex][dayIndex - 1].date;
      updateCalendar();
    }
    // If the weekIndex is the first row in the calendar and the dayIndex is the first day in the week (i.e. the focused day is the first day of the month and it is also the first day on the first row and first column in the calendar), then set the `value` to be the last day of the previous month and update the calendar to the previous month.
    else if (weekIndex === 0 && dayIndex === 0) {
      const d = getDateObjFromISODate(day.date);
      // Update the date to be the last day of the previous month.
      d.setDate(d.getDate() - 1);
      focusDay = getISODateFromDateObj(d);
      updateCalendar();
    }
    // If the dayIndex is the first day in the week, then subtract 1 from the weekIndex and set the dayIndex to 6.
    else if (dayIndex === 0) {
      focusDay = dates[weekIndex - 1][6].date;
    }
    // Else set the value to the previous date.
    else {
      focusDay = dates[weekIndex][dayIndex - 1].date;
    }
  }

  function moveFocusToFirstDayOfWeek(weekIndex) {
    focusDay = dates[weekIndex][0].date;
  }

  function moveFocusToLastDayOfWeek(weekIndex) {
    focusDay = dates[weekIndex][6].date;
  }

  function moveFocusToNextWeek(day, weekIndex, dayIndex) {
    // If the day that will be highlighted in the next week is disabled because it is in the next month but the date is not displayed in the calendar (i.e. the weekIndex is the second to last nested array in the `dates` array), then set the `value` to be the focused day of the next month and update the calendar to the next month.
    if (weekIndex === dates.length - 2 && dates[weekIndex + 1][dayIndex]?.disabled) {
      focusDay = dates[weekIndex + 1][dayIndex].date;
      updateCalendar();
    }
    // If the day that will be highlighted is one week in the future and does not appear in the calendar (i.e. the focused day's weekIndex is the last row in the calendar), then add 7 days to the date object, set the `value` to be the updated date that is one week in the future, and update the calendar to the next month.
    else if (weekIndex === dates.length - 1) {
      const d = getDateObjFromISODate(day.date);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() + 7);
      focusDay = getISODateFromDateObj(d);
      updateCalendar();
    }
    // Else set the value to the next week's date.
    else {
      focusDay = dates[weekIndex + 1][dayIndex].date;
    }
  }

  function moveFocusToPreviousWeek(day, weekIndex, dayIndex) {
    // If the day that will be highlighted in the previous week is disabled because it is in the previous month but it is displaying in the calendar (i.e. the weekIndex is the second nested array in the `dates` array), then set the `value` to be the focused day of the previous month and update the calendar to the previous month.
    if (weekIndex === 1 && dates[weekIndex - 1][dayIndex]?.disabled) {
      focusDay = dates[weekIndex - 1][dayIndex].date;
      updateCalendar();
    }
    // If the day that will be highlighted is one week in the past and does not appear in the calendar (i.e. the focused day's weekIndex is the first row in the calendar), then subtract 7 days from the date object, set the `value` to be the updated date that is one week in the past, and update the calendar to the previous month.
    else if (weekIndex === 0) {
      const d = getDateObjFromISODate(day.date);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() - 7);
      focusDay = getISODateFromDateObj(d);
      updateCalendar();
    }
    // Else set the value to the next week's date.
    else {
      focusDay = dates[weekIndex - 1][dayIndex].date;
    }
  }

  function moveToPreviousMonth(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISODate(date);
    // Update the date to the previous month.
    focusDay = getISODateFromDateObj(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()));
    updateCalendar();
  }

  function moveToNextMonth(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISODate(date);
    // Update the date to the next month.
    focusDay = getISODateFromDateObj(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()));
    updateCalendar();
  }

  function moveToPreviousYear(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISODate(date);
    // Update the date to the previous year.
    focusDay = getISODateFromDateObj(new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()));
    updateCalendar();
  }

  function moveToNextYear(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISODate(date);
    // Update the date to the next year.
    focusDay = getISODateFromDateObj(new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()));
    updateCalendar();
  }
</script>

<div class="modal">
  <div
    id="id-datepicker-1" 
    class="datepicker-dialog"
    style={`top: ${top}px; left: ${left}px;`}
    role="dialog" 
    aria-modal="true" 
    aria-label="Choose Date" 
    transition:fly
  >
    <div class="header">
      <button 
        type="button" 
        class="prev-year" 
        aria-label="previous year"
        on:click={() => moveToPreviousYear(focusDay)}
        on:keydown={(event) => {
          if (event.key === "Esc" || event.key === "Escape") {
            dispatch("hideDialog");
          }
        }}
      >
        <Icon icon="vaadin:angle-double-left" width="24" />
      </button>

      <button
        type="button" 
        class="prev-month" 
        aria-label="previous month"
        on:click={() => moveToPreviousMonth(focusDay)}
        on:keydown={(event) => {
          if (event.key === "Esc" || event.key === "Escape") {
            dispatch("hideDialog");
          }
        }}
      >
        <Icon icon="vaadin:angle-left" width="24" />
      </button>

      <span id="id-grid-label" class="month-year-heading" aria-live="polite">{ monthYearHeading }</span>

      <button
        type="button" 
        class="next-month" 
        aria-label="next month"
        on:click={() => moveToNextMonth(focusDay)}
        on:keydown={(event) => {
          if (event.key === "Esc" || event.key === "Escape") {
            dispatch("hideDialog");
          }
        }}
      >
        <Icon icon="vaadin:angle-right" width="24" />
      </button>

      <button
        type="button" 
        class="next-year" 
        aria-label="next year" 
        bind:this={nextYearBtn}
        on:click={() => moveToNextYear(focusDay)}
        on:keydown={(event) => {
          if (event.key === "Esc" || event.key === "Escape") {
            dispatch("hideDialog");
          }
        }}
      >
        <Icon icon="vaadin:angle-double-right" width="24" />
      </button>
    </div>

    <div class="table-wrapper">
      <table class="calendar" role="grid" aria-labelledby="id-grid-label">
        <thead>
          <tr>
            <th scope="col" abbr="Sunday">Su</th>
            <th scope="col" abbr="Monday">Mo</th>
            <th scope="col" abbr="Tuesday">Tu</th>
            <th scope="col" abbr="Wednesday">We</th>
            <th scope="col" abbr="Thursday">Th</th>
            <th scope="col" abbr="Friday">Fr</th>
            <th scope="col" abbr="Saturday">Sa</th>
          </tr>
        </thead>

        <tbody>
          {#each dates as week, weekIndex}
            <tr>
              {#each week as day, dayIndex}
                <td
                  tabindex={focusDay === day.date ? 0 : -1}
                  aria-selected={value === day.date ? true : null}
                  data-date={day.date}
                  class:disabled={day.disabled}
                  on:click={() => handleDayClick(day)}
                  on:keydown={(event) => handleDayKeyDown(event, day, weekIndex, dayIndex)}
                  on:focus={() => dialogMessage = "Cursor keys can navigate dates"}
                >
                  {#if !day.disabled}
                    {day.day}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="dialog-ok-cancel-group">
      <button
        class="dialog-button" 
        value="cancel" 
        bind:this={cancelBtn}
        on:click={() => dispatch("hideDialog")}
        on:keydown={(event) => {
          if (event.key === "Shift") {
            event.preventDefault();
          }
          else if (event.key === "Tab")   {
            okBtn.focus();
            event.preventDefault();
            if (event.shiftKey) {
              setFocusDay();
            }
          }
          else {
            dispatch("hideDialog");
          }
        }}
      >
        Cancel
      </button>
      <button 
        class="dialog-button" 
        value="ok"
        bind:this={okBtn}
        on:click={() => {
          value = focusDay;
          dispatch("hideDialog");
        }}
        on:keydown={(event) => {
          if (event.key === "Shift") {
            event.preventDefault();
          }
          else if (event.key === "Tab") {
            if (event.shiftKey) {
              cancelBtn.focus();
              event.preventDefault();
            }
          }
          else {
            value = focusDay;
            dispatch("hideDialog");
          }
        }}
      >
        OK
      </button>
    </div>
    <div class="dialog-message" aria-live="polite">{ dialogMessage }</div>
  </div>
</div>

<style>
  /* The Modal (background) */
  .modal {
    position: fixed; /* Stay in place */
    z-index: 100; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    display: flex; /* This will center the #modal-content-container vertically */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    padding: 15px;

    & .datepicker-dialog {
      /* position: relative; */
      /* margin: auto; */
      position: absolute;
      width: 400px;
      max-width: 100%;
      border: 3px solid var(--date-picker-calendar-border-color);
      border-radius: var(--border-radius);
      padding: 0;
      background-color: var(--white);
      z-index: 2;
      box-shadow: var(--box-shadow-depth);

      & .header {
        cursor: default;
        background-color: var(--date-picker-calendar-border-color);
        padding: 7px;
        font-weight: bold;
        text-transform: uppercase;
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: space-around;

        & .month-year-heading {
          margin: 0;
          padding: 0;
          display: inline-block;
          font-size: 1em;
          color: var(--white);
          text-transform: none;
          font-weight: bold;
          border: none;

          display: inline-block;
          width: 12em;
          text-align: center;
        }

        & .prev-year, & .prev-month, & .next-month, & .next-year {

          &:hover {
            outline: 1px solid var(--white);
            border-radius: var(--border-radius);
          }
        }
      }

      & table.calendar {
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        border: none;
        border-collapse: separate;

        & th, & td {
          padding: 0;
          text-align: center;
          background: var(--white);
          color: var(--text-color-default);
          border: none;
        }

        & td {
          background-color: var(--bg-color-element-default);
          padding: 3px;
          border: var(--border-default);
          margin: 0;
          line-height: inherit;
          height: 40px;
          width: 40px;
          border-radius: var(--border-radius);
          font-size: 15px;
          cursor: pointer;

          &:hover {
            border-color: var(--date-picker-calendar-selected-date-bg-color);
          }

          &.disabled {
            border-color: transparent;
            pointer-events: none;
          }
        }

        /* Selected date styles */
        & td[aria-selected] {
          border: 2px dotted var(--date-picker-calendar-selected-date-bg-color);
        }

        /* Focused date styles */
        & td[tabindex="0"] {
          outline: none;
          background-color: var(--date-picker-calendar-selected-date-bg-color);
          border-color: var(--date-picker-calendar-selected-date-bg-color);
          color: var(--date-picker-calendar-selected-date-text-color);
        }
      }

      & .dialog-ok-cancel-group {
        text-align: right;
        margin-top: 1em;
        margin-bottom: 1em;
        margin-right: 1em;

        & .dialog-button {
          padding: 6px;
          margin-left: 1em;
          width: 5em;
          background-color: var(--bg-color-element-default);
          font-size: 0.85em;
          color: var(--text-color-default);
          outline: none;
          border: var(--border-default);
          border-radius: var(--border-radius);

          &:focus {
            padding: 5px;
            border: 2px solid var(--secondary-color);
          }

          &:hover {
            border-color: var(--secondary-color);
          }
        }
      }

      & .dialog-message {
        padding-top: 0.25em;
        padding-left: 1em;
        height: 1.75em;
        background: var(--date-picker-calendar-border-color);
        color: var(--white);
      }
    }
  }
</style>
