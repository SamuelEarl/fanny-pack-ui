<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { fromEvent } from "file-selector";
  import Icon from "@iconify/svelte";
  import {
    allFilesAccepted,
    composeEventHandlers,
    fileAccepted,
    fileMatchSize,
    isEvtWithFiles,
    isIeOrEdge,
    isPropagationStopped,
    onDocumentDragOver,
    TOO_MANY_FILES_REJECTION
  } from "./utils";

  //props
  /**
   * Set accepted file types.
   * See https://github.com/okonet/attr-accept for more information.
   */
  export let uploadIcon = "mdi:cloud-upload";
  export let accept; // string or string[]
  export let disabled = false;
  export let getFilesFromEvent = fromEvent;
  export let maxSize = Infinity;
  export let minSize = 0;
  export let multiple = true;
  export let preventDropOnDocument = true;
  export let noClick = false;
  export let noKeyboard = false;
  export let noDrag = false;
  export let noDragEventsBubbling = false;
  export let disableDefaultStyles = false;

  const dispatch = createEventDispatcher();

  //state

  let state = {
    isFocused: false,
    isFileDialogActive: false,
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    draggedFiles: [],
    acceptedFiles: [],
    fileRejections: []
  };

  let rootRef;
  let inputRef;

  function resetState() {
    state.isFileDialogActive = false;
    state.isDragActive = false;
    state.draggedFiles = [];
    state.acceptedFiles = [];
    state.fileRejections = [];
  }

  // Fn for opening the file dialog programmatically
  function openFileDialog() {
    if (inputRef) {
      inputRef.value = null; // TODO check if null needs to be set
      state.isFileDialogActive = true;
      inputRef.click();
    }
  }

  // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone
  function onKeyDownCb(event) {
    // Ignore keyboard events bubbling up the DOM tree
    if (!rootRef || !rootRef.isEqualNode(event.target)) {
      return;
    }

    // NOTE: `event.keyCode` is deprecated. Use `event.key` instead. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key.
    if (event.key === "Enter" || event.key === "Space") {
      event.preventDefault();
      openFileDialog();
    }
  }

  // Update focus state for the dropzone
  function onFocusCb() {
    state.isFocused = true;
  }
  function onBlurCb() {
    state.isFocused = false;
  }

  // Cb to open the file dialog when click occurs on the dropzone
  function onClickCb() {
    if (noClick) {
      return;
    }

    // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
    // to ensure React can handle state changes
    // See: https://github.com/react-dropzone/react-dropzone/issues/450
    if (isIeOrEdge()) {
      setTimeout(openFileDialog, 0);
    } else {
      openFileDialog();
    }
  }

  function onDragEnterCb(event) {
    event.preventDefault();
    stopPropagation(event);

    dragTargetsRef = [...dragTargetsRef, event.target];

    if (isEvtWithFiles(event)) {
      Promise.resolve(getFilesFromEvent(event)).then(draggedFiles => {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }

        state.draggedFiles = draggedFiles;
        state.isDragActive = true;

        dispatch("dragenter", {
          dragEvent: event
        });
      });
    }
  }

  function onDragOverCb(event) {
    event.preventDefault();
    stopPropagation(event);

    if (event.dataTransfer) {
      try {
        event.dataTransfer.dropEffect = "copy";
      } catch {} /* eslint-disable-line no-empty */
    }

    if (isEvtWithFiles(event)) {
      dispatch("dragover", {
        dragEvent: event
      });
    }

    return false;
  }

  function onDragLeaveCb(event) {
    event.preventDefault();
    stopPropagation(event);

    // Only deactivate once the dropzone and all children have been left
    const targets = dragTargetsRef.filter(
      target => rootRef && rootRef.contains(target)
    );
    // Make sure to remove a target present multiple times only once
    // (Firefox may fire dragenter/dragleave multiple times on the same element)
    const targetIdx = targets.indexOf(event.target);
    if (targetIdx !== -1) {
      targets.splice(targetIdx, 1);
    }
    dragTargetsRef = targets;
    if (targets.length > 0) {
      return;
    }

    state.isDragActive = false;
    state.draggedFiles = [];

    if (isEvtWithFiles(event)) {
      dispatch("dragleave", {
        dragEvent: event
      });
    }
  }

  function onDropCb(event) {
    event.preventDefault();
    stopPropagation(event);

    dragTargetsRef = [];

    if (isEvtWithFiles(event)) {
      dispatch("filedropped", {
        event
      })
      Promise.resolve(getFilesFromEvent(event)).then(files => {
        if (isPropagationStopped(event) && !noDragEventsBubbling) {
          return;
        }

        const acceptedFiles = [];
        const fileRejections = [];

        files.forEach(file => {
          const [accepted, acceptError] = fileAccepted(file, accept);
          const [sizeMatch, sizeError] = fileMatchSize(file, minSize, maxSize);
          if (accepted && sizeMatch) {
            acceptedFiles.push(file);
          } else {
            const errors = [acceptError, sizeError].filter(e => e);
            fileRejections.push({ file, errors });
          }
        });

        if (!multiple && acceptedFiles.length > 1) {
          // Reject everything and empty accepted files
          acceptedFiles.forEach(file => {
            fileRejections.push({ file, errors: [TOO_MANY_FILES_REJECTION] });
          });
          acceptedFiles.splice(0);
        }

        state.acceptedFiles = acceptedFiles;
        state.fileRejections = fileRejections;

        dispatch("drop", {
          acceptedFiles,
          fileRejections,
          event
        });

        if (fileRejections.length > 0) {
          dispatch("droprejected", {
            fileRejections,
            event
          });
        }

        if (acceptedFiles.length > 0) {
          dispatch("dropaccepted", {
            acceptedFiles,
            event
          });
        }
      });
    }
    resetState();
  }

  function composeHandler(fn) {
    return disabled ? null : fn;
  }

  function composeKeyboardHandler(fn) {
    return noKeyboard ? null : composeHandler(fn);
  }

  function composeDragHandler(fn) {
    return noDrag ? null : composeHandler(fn);
  }

  function stopPropagation(event) {
    if (noDragEventsBubbling) {
      event.stopPropagation();
    }
  }

  let dragTargetsRef = [];
  function onDocumentDrop(event) {
    if (rootRef && rootRef.contains(event.target)) {
      // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
      return;
    }
    event.preventDefault();
    dragTargetsRef = [];
  }

  // Update file dialog active state when the window is focused on
  function onWindowFocus() {
    // Execute the timeout only if the file dialog is opened in the browser
    if (state.isFileDialogActive) {
      setTimeout(() => {
        if (inputRef) {
          const { files } = inputRef;

          if (!files.length) {
            state.isFileDialogActive = false;
            dispatch("filedialogcancel");
          }
        }
      }, 300);
    }
  }

  // TODO: Error: window is not defined. I need to fix these issues.
  // onMount(() => {
  //   window.addEventListener("focus", onWindowFocus, false);
  //   if (preventDropOnDocument) {
  //     document.addEventListener("dragover", onDocumentDragOver, false);
  //     document.addEventListener("drop", onDocumentDrop, false);
  //   }
  // });

  // onDestroy(() => {
  //   window.removeEventListener("focus", onWindowFocus, false);
  //   if (preventDropOnDocument) {
  //     document.removeEventListener("dragover", onDocumentDragOver);
  //     document.removeEventListener("drop", onDocumentDrop);
  //   }
  // });

  function onInputElementClick(event) {
    event.stopPropagation();
  }
</script>


<!-- TODO: Add the `cursor: no-drop` style when the drop zone is disabled. -->
<div
  class={disableDefaultStyles ? '' : 'dropzone'}
  bind:this={rootRef}
  tabIndex="0"
  on:keydown={composeKeyboardHandler(onKeyDownCb)}
  on:focus={composeKeyboardHandler(onFocusCb)}
  on:blur={composeKeyboardHandler(onBlurCb)}
  on:click={composeHandler(onClickCb)}
  on:dragenter={composeDragHandler(onDragEnterCb)}
  on:dragover={composeDragHandler(onDragOverCb)}
  on:dragleave={composeDragHandler(onDragLeaveCb)}
  on:drop={composeDragHandler(onDropCb)}
>
  <input
    {accept}
    {multiple}
    type="file"
    autocomplete="off"
    tabindex="-1"
    on:change={onDropCb}
    on:click={onInputElementClick}
    bind:this={inputRef}
    style="display: none;" 
  />
  <slot>
    <p>Drop files here or click and select files to upload</p>
  </slot>
  <Icon icon="{uploadIcon}" width="50" />
</div>


<style>
  .dropzone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 2px dashed;
    border-color: var(--neutral-8);
    border-radius: var(--border-radius);
    background-color: var(--bg-color-element-default);
    color: var(--text-color-default);
    outline: none;
    transition: border 0.25s ease-in-out;
    cursor: pointer;

    &:focus {
      border-color: var(--fp-drop-zone-focus-border-color, #343434);
    }
  }
</style>
