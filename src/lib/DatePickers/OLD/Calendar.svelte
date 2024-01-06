<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getMonthLength, getCalendarDays } from "./date-utils";
  import type { CalendarDay } from "./date-utils";
  import { getInnerLocale } from "./locale";
  import type { Locale } from "./locale";
  import { Label } from "../Labels";
  import { createId } from "../utils";

  export let label = "";
  // I am not documenting this prop in the docs because I wanted to keep a "flat" look for these components as much as possible. However, this prop needs to stay here because the `<DateInput>` component passes `true` to this prop.
  export let popup = false;

  const dispatch = createEventDispatcher<{ select: undefined }>();
  let componentId = createId();

  /** Date value. It's `null` if no date is selected */
  export let value: Date | null = null;

  function setValue(d: Date) {
    if (d.getTime() !== value?.getTime()) {
      value = d;
    }
  }

  function updateValue(updater: (date: Date) => Date) {
    const newValue = updater(new Date(shownDate.getTime()));
    setValue(newValue);
  }

  /** Default Date to use */
  const defaultDate = new Date();

  /** The date shown in the popup, for when `value` is null */
  let shownDate = value ?? defaultDate;
  $: if (value) shownDate = value;

  /** Update the shownDate. The date is only selected if a date is already selected */
  function updateShownDate(updater: (date: Date) => Date) {
    shownDate = updater(new Date(shownDate.getTime()));
    if (value && shownDate.getTime() !== value.getTime()) {
      setValue(shownDate);
    }
  }

  /** The earliest year the user can select */
  export let min = new Date(defaultDate.getFullYear() - 10, 0, 1);
  /** The latest year the user can select */
  export let max = new Date(defaultDate.getFullYear() + 10, 11, 31);
  
  let years = getYears(min, max);
  $: years = getYears(min, max);

  function getYears(min: Date, max: Date) {
    let years = [];
    for (let i = min.getFullYear(); i <= max.getFullYear(); i++) {
      years.push(i);
    }
    return years;
  }

  $: if (shownDate > max) {
    updateShownDate(() => max);
  }
  else if (shownDate < min) {
    updateShownDate(() => min);
  }

  /** Locale object for internationalization */
  export let locale: Locale = {};

  $: iLocale = getInnerLocale(locale);

  let year = shownDate.getFullYear();
  const getYear = (tmpPickerDate: Date) => (year = tmpPickerDate.getFullYear());

  function setYear(year: number) {
    updateShownDate((tmpPickerDate) => {
      tmpPickerDate.setFullYear(year);
      return tmpPickerDate;
    });
  }

  $: getYear(shownDate);
  $: setYear(year);

  let month = shownDate.getMonth();
  const getMonth = (tmpPickerDate: Date) => (month = tmpPickerDate.getMonth());

  function setMonth(month: number) {
    let newYear = year;
    let newMonth = month;
    if (month === 12) {
      newMonth = 0;
      newYear++;
    }
    else if (month === -1) {
      newMonth = 11;
      newYear--;
    }

    const maxDate = getMonthLength(newYear, newMonth);
    const newDate = Math.min(shownDate.getDate(), maxDate);

    updateShownDate((date) => {
      return new Date(
        newYear,
        newMonth,
        newDate,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      );
    });
  }
  $: getMonth(shownDate);
  $: setMonth(month);

  let dayOfMonth = value?.getDate() || null;
  $: dayOfMonth = value?.getDate() || null;

  $: calendarDays = getCalendarDays(shownDate, iLocale.weekStartsOn);

  function setDay(calendarDay: CalendarDay) {
    if (dayIsInRange(calendarDay, min, max)) {
      updateValue((value) => {
        value.setFullYear(0);
        value.setMonth(0);
        value.setDate(1);
        value.setFullYear(calendarDay.year);
        value.setMonth(calendarDay.month);
        value.setDate(calendarDay.number);
        return value;
      });
    }
  }

  function selectDay(calendarDay: CalendarDay) {
    setDay(calendarDay);
    dispatch("select");
  }
  
  function dayIsInRange(calendarDay: CalendarDay, min: Date, max: Date) {
    const date = new Date(calendarDay.year, calendarDay.month, calendarDay.number);
    const minDate = new Date(min.getFullYear(), min.getMonth(), min.getDate());
    const maxDate = new Date(max.getFullYear(), max.getMonth(), max.getDate());
    return date >= minDate && date <= maxDate;
  }

  function shiftKeydown(e: KeyboardEvent) {
    if (e.shiftKey && e.key === "ArrowUp") {
      setYear(year - 1);
    }
    else if (e.shiftKey && e.key === "ArrowDown") {
      setYear(year + 1);
    }
    else if (e.shiftKey && e.key === "ArrowLeft") {
      setMonth(month - 1);
    }
    else if (e.shiftKey && e.key === "ArrowRight") {
      setMonth(month + 1);
    } 
    else {
      return false;
    }
    e.preventDefault();
    return true;
  }

  function yearKeydown(e: KeyboardEvent) {
    let shift = e.shiftKey || e.altKey;
    if (shift) {
      shiftKeydown(e);
      return;
    } 
    else if (e.key === "ArrowUp") {
      setYear(year - 1);
    } 
    else if (e.key === "ArrowDown") {
      setYear(year + 1);
    } 
    else if (e.key === "ArrowLeft") {
      setMonth(month - 1);
    } 
    else if (e.key === "ArrowRight") {
      setMonth(month + 1);
    } 
    else {
      shiftKeydown(e);
      return;
    }
    e.preventDefault();
  }

  function monthKeydown(e: KeyboardEvent) {
    let shift = e.shiftKey || e.altKey;
    if (shift) {
      shiftKeydown(e);
      return;
    } 
    else if (e.key === "ArrowUp") {
      setMonth(month - 1);
    } 
    else if (e.key === "ArrowDown") {
      setMonth(month + 1);
    } 
    else if (e.key === "ArrowLeft") {
      setMonth(month - 1);
    } 
    else if (e.key === "ArrowRight") {
      setMonth(month + 1);
    } 
    else {
      shiftKeydown(e);
      return;
    }
    e.preventDefault();
  }

  function keydown(e: KeyboardEvent) {
    let shift = e.shiftKey || e.altKey;
    if ((e.target as HTMLElement)?.tagName === "SELECT") {
      return;
    }
    if (shift) {
      shiftKeydown(e);
      return;
    } 
    else if (e.key === "ArrowUp") {
      updateValue((value) => {
        value.setDate(value.getDate() - 7);
        return value;
      });
    } 
    else if (e.key === "ArrowDown") {
      updateValue((value) => {
        value.setDate(value.getDate() + 7);
        return value;
      });
    } 
    else if (e.key === "ArrowLeft") {
      updateValue((value) => {
        value.setDate(value.getDate() - 1);
        return value;
      });
    } 
    else if (e.key === "ArrowRight") {
      updateValue((value) => {
        value.setDate(value.getDate() + 1);
        return value;
      });
    } 
    else {
      return;
    }
    e.preventDefault();
  }
</script>


<Label {label} forVal={`fp-calendar-${componentId}`} />
<div class="calendar-container" class:popup on:focusout tabindex="0" on:keydown={keydown}>
  <div class="top">
    <button class="change-month-btn" tabindex="-1" on:click={() => setMonth(month - 1)}>
      &ltrif;
    </button>
    <div class="select-container month">
      <select bind:value={month} on:keydown={monthKeydown}>
        {#each iLocale.months as monthName, i}
          <option
            disabled={new Date(year, i, getMonthLength(year, i)) < min || new Date(year, i) > max}
            value={i}>{monthName}</option
          >
        {/each}
      </select>
    </div>
    <div class="select-container year">
      <select bind:value={year} on:keydown={yearKeydown}>
        {#each years as v}
          <option value={v}>{v}</option>
        {/each}
      </select>
    </div>
    <button class="change-month-btn" tabindex="-1" on:click={() => setMonth(month + 1)}>
      &rtrif;
    </button>
  </div>
  <div class="weekdays-header">
    {#each Array(7) as _, i}
      {#if i + iLocale.weekStartsOn < 7}
        <div class="weekdays-header-cell">{iLocale.weekdays[iLocale.weekStartsOn + i]}</div>
      {:else}
        <div class="weekdays-header-cell">{iLocale.weekdays[iLocale.weekStartsOn + i - 7]}</div>
      {/if}
    {/each}
  </div>
  {#each Array(6) as _, weekIndex}
    <div class="week">
      {#each calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7) as calendarDay}
        <div
          class="date"
          on:click={() => selectDay(calendarDay)}
          class:disabled={!dayIsInRange(calendarDay, min, max)}
          class:selected={calendarDay.month === month && calendarDay.number === dayOfMonth}
          class:other-month={calendarDay.month !== month}
        >
          <span>{calendarDay.number}</span>
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .calendar-container {
    display: inline-block;
    padding: 5px;
    border: var(--border-default);
    border-radius: var(--border-radius);
    background: var(--white);
    color: inherit;
    user-select: none;
    -webkit-user-select: none;
    cursor: default;
    font-size: 0.75rem;

    &:hover {
      box-shadow: var(--box-shadow-default);
    }

    &.popup {
      border: 2px solid;
      border-color: var(--border-color-default);
      box-shadow: var(--box-shadow-depth);
    }

    & .top {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 0.5rem;

      & .change-month-btn {
        padding: 2px 7px;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 1.25rem;
        color: inherit;
        flex-shrink: 0;
        box-sizing: border-box;
        cursor: pointer;
      }

      /* 
        Customize select element styles:
        * https://www.w3schools.com/howto/howto_custom_select.asp
        * https://moderncss.dev/custom-select-styles-with-pure-css/
      */
      & .select-container {
        position: relative;
        margin: 0 4px;

        & select {
          /* A reset of styles, including removing the default dropdown arrow */
          appearance: none;
          /* Additional resets for further consistency */
          margin: 0;
          font-family: inherit;
          outline: none;

          /* Add custom styles */
          width: 100%;
          padding: 0.35rem 0.5rem;
          border: var(--border-default);
          border-radius: var(--border-radius);
          font-size: 0.85rem;
          background-color: var(--white);
          color: inherit;
          cursor: pointer;

          &:hover {
            box-shadow: var(--box-shadow-default);
          }
        }

        &.month, &.year {
          flex-grow: 1;
        }
      }
    }
  }

  .weekdays-header {
    display: flex;
    font-weight: 600;
    padding-bottom: 3px;

    & .weekdays-header-cell {
      width: 1.875rem;
      text-align: center;
      flex-grow: 1;
    }
  }

  .week {
    display: flex;

    & .date {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 1.94rem;
      flex-grow: 1;
      border: 1px solid;
      border-color: transparent;
      border-radius: var(--border-radius);
      box-sizing: border-box;

      &:hover {
        border: var(--border-default);
        cursor: pointer;
      }

      &.disabled {
        visibility: hidden;
        cursor: default;

        &:hover {
          border: none;
          background-color: transparent;
        }
      }

      &.other-month span {
        opacity: 0.4;
      }

      &.selected {
        border: var(--border-default);
        color: inherit;
        background-color: var(--bg-color-element-default);
      }
    }
  }
</style>
