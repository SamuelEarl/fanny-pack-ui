<!--
  This component was created following these tutorials:
  * https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
  * https://www.smashingmagazine.com/2022/03/drag-drop-file-uploader-vuejs-3/
-->
<!-- If I want to enhance this component, then I can refer to the second part of this tutorial (which uses the HTML Drag and Drop API):
https://blog.logrocket.com/create-drag-and-drop-component-react-dropzone/ -->

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import { Button } from "../Buttons";

  export let handleFileUploads;
  export let accept = "*";
  export let dropZoneSelectFilesBtnIcon = "lucide:mouse-pointer-2";
  export let dragAndDropIcon = "pixelarticons:drag-and-drop";
  export let dropZoneUploadFilesBtnIcon = "mdi:cloud-upload";

  // Refer to the FormData API for information on the FormData methods used in this component: https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
  let formData;
  let events = ["dragenter", "dragover", "dragleave", "drop"];
  let fileInput;
  let active = false;
  let uploading = false;

  onMount(() => {
    // Loop over the list of events and prevent the default behavior for each event on the document body.
    // If you do not do this, then if a user drops files on your web app, but outside of the drop zone, then the browser's default behavior might download the file through the browser or it might open a new tab in the browser or whatever your browser's default behavior is. So preventing these default behaviors will also help to prevent confusion for your users if they accidentally drop files in the wrong place within your app.
    events.forEach((eventName) => {
      document.body.addEventListener(eventName, preventDefaults);
    });
  });

  onDestroy(() => {
    // The onDestroy hook also runs on the server, so `document` will throw an `undefined` error. You can prevent that by checking if the environment is a `browser`. See https://github.com/sveltejs/kit/discussions/2741.
    if (browser) {
      // Remove the event listeners when this component is destroyed.
      events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults);
      });
    }
  });

  function preventDefaults(event) {
    event.preventDefault();
  }

  /**
   * This function appends new files to the FormData object.
   * @param {Object} stagedFiles - stagedFiles is a FileList object that contains all of the files that the user selected after clicking the file input button or all the files that were dragged and dropped onto the drop zone. Each item in the FileList object is a File object.
   */
  function addFilesToStage(stagedFiles) {
    console.log("STAGED FILES:", stagedFiles);
    // If there is no existing FormData object, then create a new one.
    // This will allow new files to be appended to the end of the existing FormData object.
    // If there was no conditional `if (!formData)` statement, then a new FormData object would be created each time a user selected or dropped new files and all their previously selected files would be removed from the list of files to be uploaded.
    if (!formData) {
      formData = new FormData();
    }

    // Loop over the File objects (that are inside the stagedFiles FileList object) and append the files that do not already exist in the FormData object.
    for (let i = 0; i < stagedFiles.length; i++) {
      // Create a unique ID for each file that will be used as the key when the file is appended to the FormData object.
      let id = `${stagedFiles[i].name}-${stagedFiles[i].size}-${stagedFiles[i].lastModified}-${stagedFiles[i].type}`;
      
      // If the FormData object does not already contain an entry with a key equal to the id of the new file, then append the new file to the FormData object and give it a key equal to the id value that is created above. This will prevent duplicate files from being appended to the FormData object.
      if (!formData.has(id)) {
        // Append each file with a unique ID as the key. This key can then be used to remove files.
        formData.append(id, stagedFiles[i]);
      }
    }

    // Use Svelte's reactive assignment to show the current state of the FormData object in the DOM.
    formData = formData;
	}

  /**
   * Since each file that is appended to the FormData object has a unique key, 
   * this function can use that key to delete a file from the FormData object. 
   * See https://developer.mozilla.org/en-US/docs/Web/API/FormData/delete
   * @param {string} fileKey - The key that is used to delete the key/value pair from the FormData object.
   */
  function removeFile(fileKey) {
    formData.delete(fileKey);
    formData = formData;
  }

  async function handleUpload() {
    try {
      // Set uploading to true so the "Upload Files" button will be disabled and provide user feedback.
      uploading = true;

      // Before passing the FormData object to the backend (or to a 3rd-party API) for processing, create a new FormData object where each key is "files" instead of each key being a unique file ID. If each entry in the FormData object has the same key, then it should make it easier to loop over and process the files for uploading. 
      // For example, you could simply access the files with formData.getAll("files"), which will return an array of File objects that you can work with easily.

      // Create a new, reformatted FormData object.
      let reformattedFormData = new FormData();
      // Get the values from the FormData object, which are each File objects. formData.values() returns an iterator, but often times you need to work with an array. So the [...formData.values()] syntax is how you convert an iterable to an array. See https://www.samanthaming.com/tidbits/78-iterables-to-array-using-spread/
      let formDataValuesArray = [...formData.values()];
      // Loop over the File objects in the formDataValuesArray and append each File object to the new reformattedFormData object and give each File object a key of "files".
      for (let i = 0; i < formDataValuesArray.length; i++) {
        reformattedFormData.append("files", formDataValuesArray[i]);
      }

      // Call the `handleFileUploads()` function that is passed in as props to this component and pass it the new reformattedFormData object.
      await handleFileUploads(reformattedFormData);
      // Once execution returns back to this function, set `uploading` back to false to re-enable the buttons in this component.
      uploading = false;
      // Clear the FormData object, which will also clear the list of files in the DropZone.
      formData = null;
    }
    catch(err) {
      console.error("handleUpload Error:", err);
    }
  }
</script>


<div 
  class="drop-zone"
  class:active
  on:drop|preventDefault={(event) => {
    // If some files are already uploading, then return early so new files cannot be dropped.
    if (uploading) return;
    // You can access the files from a `drop` event through the event.dataTransfer.files property.
    addFilesToStage(event.dataTransfer.files);
    active = false;
  }}
  on:dragenter|preventDefault={() => {
    // If new files are dragged over the drop zone while other files are already uploading,
    // then return early to maintain a "disabled" appearance.
    if (uploading) return;
    active = true;
  }}
  on:dragover|preventDefault={() => {
    // If new files are dragged over the drop zone while other files are already uploading,
    // then return early to maintain a "disabled" appearance.
    if (uploading) return;
    active = true;
  }}
  on:dragleave|preventDefault={() => {
    // It is always ok to set `active` to false when a user drags files away from the drop zone. 
    // So it is not necessary to check if `uploading` is true before setting `active` back to false.
    active = false;
  }}
>
  <!-- Use enctype="multipart/form-data" if the form contains <input type="file"> elements (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype). -->
  <form on:submit|preventDefault={handleUpload} enctype="multipart/form-data">
    <div class="file-input-container">
      <!-- Wrap the #file-input-btn in a span so you can reset the `pointer-events` to `auto` in the CSS. -->
      <span class="file-input-btn-container">
        <Button
          id="file-input-btn" 
          on:click={() => fileInput.click()}
          disabled={uploading}
          btnIcon={dropZoneSelectFilesBtnIcon}
          btnIconDisabled={dropZoneSelectFilesBtnIcon}
          btnIconDisabledShouldSpin={false}
        >
          Select Files
        </Button>
      </span>
      <input
        bind:this={fileInput}
        type="file" 
        class="file-input-field" 
        multiple
        {accept}
        on:change={(event) => {
          // You can access the files from a file input's `change` event through the event.target.files property.
          addFilesToStage(event.target.files);
          // If a user adds a file via the input, decides to remove it from their file list, then changes their mind and decides to use the input to add that file again, then the file input will not fire the `change` event because the file input has not changed. By resetting `event.target.value` back to null, you ensure the `change` event will always be fired.
          event.target.value = null;
        }}
      >
    </div>
    <div class="drag-drop-text-container">
      <slot>Or Drag &amp; Drop Files Here</slot>
    </div>
    <div class="drag-drop-icon-container">
      <Icon icon="{dragAndDropIcon}" width="50" />
    </div>

    {#if formData && [...formData.entries()].length > 0}
      <div class="upload-files-container">
        <div class="upload-all-files-btn-container">
          <Button
            type="submit"
            btnIcon={dropZoneUploadFilesBtnIcon}
            disabled={uploading}
          >
            Upload Files
          </Button>
        </div>
        {#each [...formData.entries()] as file (file[0])}
          <div class="staged-file-container">
            <div class="file-name" class:active>{file[1].name}</div>
            <button class="remove-file-btn" on:click={() => removeFile(file[0])} disabled={uploading}>
              <Icon icon="ri:delete-bin-2-line" width="16" />
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </form>
</div>


<style>
  .drop-zone {
    padding: 20px;
    padding-bottom: 5px;
    border: 2px dashed;
    border-color: var(--neutral-8);
    border-radius: var(--border-radius);
    text-align: center;
    background-color: var(--bg-color-element-default);
    color: var(--text-color-default);
    outline: none;
    transition: border 0.25s ease-in-out;

    &.active {
      background-color: var(--white);
    }

    & .file-input-container {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      /* The pointer-events CSS property sets under what circumstances (if any) a particular graphic element can become the target of pointer events. (https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) */
      /* What does the `pointer-events: none` rule do? The .drop-zone element is configured to change state from inactive to active when a user drags files over the top of it. But the .drop-zone element has child elements nested inside of it. Each time a user drags files over the top of any of those child elements the browser acts as if the user leaves the .drop-zone element and enters the child element for a moment. However, the drag events bubble up from the child elements and are handled by the .drop-zone element. The drag events that the .drop-zone element handles each fire at different times, which causes the active state to switch back and forth causing the UI to flicker. */
      /* The pointer-events rules provide specific instructions to specific elements telling them which ones can receive pointer events (e.g. hover events) and which ones cannot. Setting some elements to `pointer-events: none` tells them that they cannot receive any pointer events. So pointer events won't fire on those elements when they are being hovered, which eliminates the flickering issue. */
      pointer-events: none;

      & .file-input-btn-container {
        /* Pointer events rules trickle down to child elements. So if you have any child elements that need to have pointer events enabled, then you have to specifically state which child elements should have pointer events. */
        pointer-events: auto;
      }

      /* Hide the file input field. */
      & .file-input-field {
        display: none;
      }
    }

    & .drag-drop-text-container {
      margin-bottom: 20px;
      pointer-events: none;
    }

    & .drag-drop-icon-container {
      display: flex;
      justify-content: center;
      margin-bottom: 5px;
      pointer-events: none;
    }

    & .upload-files-container {
      margin: 20px 0;

      & .upload-all-files-btn-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }

      & .staged-file-container {
        display: flex;
        margin: 10px 0;
        text-align: left;

        & .file-name {
          flex: 1;
          padding: 5px;
          border-radius: 3px;
          background-color: var(--white);
          color: inherit;

          &.active {
            background-color: var(--bg-color-element-default);
          }
        }

        & .remove-file-btn {
          padding: 0;
          border: none;
          margin-left: 5px;
          outline: none;
          background-color: transparent;
          color: inherit;
          cursor: pointer;

          &:disabled {
            color: #a0a0a0;
            cursor: default;
          }
        }
      }
    }
  }
</style>
