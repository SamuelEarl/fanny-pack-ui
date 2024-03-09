<script lang="ts">
  import { DropZone, ToastContent } from "/src/components";
  import Icon from "@iconify/svelte";

  let containersList = [];
  let filesArray = [];
  let loading = false;

  // Pass a function named "handleFileUploads" to the <DropZone /> component.
  // Look at the documentation for your cloud storage service to find out how to upload files to their service. The API code for uploading files to their service is what you will put in this function.
  // Your "handleFileUploads" function needs to be an async function and the signature need to match this one.
  async function handleFileUploads(formData) {
    try {
      loading = true;

      console.log("Form Data (browser):", formData.getAll("files"));

      let url = "/api/process-file-uploads";
      let response = await fetch(url, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }
      
      let result = await response.json();
      console.log("handleFileUploads Result:", result);

      // TODO: Update the list of files that is displayed below DropZone.

      ToastContent.set({ type: "success", msg: "Files have been uploaded." });

      loading = false;
    }
    catch(err) {
      console.error("handleFileUploads Error:", err);
      ToastContent.set({ type: "error", msg: err.message });
    }
  }

  function deleteFile(fileId) {
    try {
      console.log("File ID:", fileId);
    }
    catch(err) {
      console.error("deleteFile Error:", err);
    }
  }
</script>


# Drop Zone (file upload)

File uploads are handled a bit differently in modern web development than they were once upon a time. For example, rather than store files in your webserver (not very scalable) or your database (really complicated, if not impossible), you should store your files in a cloud storage service (e.g. Amazon S3, Cloudflare R2, Google Cloud Storage, Azure Storage, Cloudinary, Uploadcare). When you store a file in a cloud storage service the service will return a URL where that file is located. You should take that URL and save it in your database so you can retrieve the file later.

Given that there are many cloud storage services available, each with their own set of APIs and functionality, a generic file upload component might not work for your situation. I have written a tutorial toward the bottom of this page that explains the concepts involved with a drop zone component so you can create one that fits your needs, if necessary.

Many cloud storage services provide APIs for handling file uploads from your browser-side code or from your server-side code. You should select the option that makes the most sense for your application. In order to handle large file uploads (on the server-side) you have to implement streams and [handling streams in SvelteKit is still a TODO item](https://github.com/sveltejs/kit/issues/3419) as of April 2022. So if you are creating a file upload component for SvelteKit you might have to use a browser-side file upload API.

---

***Public Service Announcements***

* *This is only a frontend component. It does not include a way to send files to a server. However, if you are looking for a frontend and backend solution, then checkout <a href="https://pqina.nl/filepond/">filepond</a> or <a href="https://uppy.io/">uppy.io</a>.*
* *If you are looking for a cloud storage service that is easy to use, then check out <a href="https://uploadcare.com/">Uploadcare</a>. (I am not affiliated with them, but maybe I should be. :)) Uploadcare has a ton of cool features, it is built on top of the Akamai CDN platform (which is one of the leading CDN platforms), it has a pretty generous free tier, and their ready-made <a href="https://uploadcare.com/docs/uploads/file-uploader/">File Uploader</a> widget is awesome! The File Uploader widget works well with SvelteKit apps and you can even customize its styles to match your app.*

---

## Example Usage

<DropZone {handleFileUploads} accept="image/*,.pdf">Drop Files Here</DropZone>

<br>

```svelte
<script>
  import { DropZone } from "@fanny-pack-ui/svelte-kit";

  /**
   * (1) The signature for your `handleFileUploads` function
   * needs to match this one.
   * (2) The body of your `handleFileUploads` function should be the
   * API code for uploading files to your cloud storage service.
   */
  async function handleFileUploads(formData) {
    try {
      let url = "https://your-cloud-storage-api-endpoint";
      let response = await fetch(url, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }
      
      let result = await response.json();

      console.log("Files have been uploaded successfully!);
    }
    catch(err) {
      console.error("handleFileUploads Error:", err);
    }
  }
</script>

<DropZone {handleFileUploads} accept="image/*,.pdf">File Drop</DropZone>
```

<br>

## How does the `handleFileUploads` function work?
After a user selects/drops files in the `<DropZone>` component, an "Upload Files" button will appear. When the user clicks that button the `handleFileUploads` function that you passed as props will be called and a `FormData` object will be passed to that function. Your `handleFileUploads` function will need to process the files according to your cloud storage service's API.

<br>

## How to upload files through your backend code

**Question:**

I want to send files to one of my own API endpoints first and then upload those files to my cloud storage service from my backend code. How do I access and read the files that were sent to my API endpoint?

**Answer:**

When a user uploads a file (or multiple files) in the browser, those files are attached to a `FormData` object with the `append()` method. The first parameter in the `append()` method is a `name` field and its second parameter is the file being uploaded. The whole thing might look something like this: `formData.append("userFiles", uploadedFiles[i])`.

When the user clicks the submit button to upload the files, a POST request containing the `formData` object that holds the files to be uploaded is sent to the API endpoint. Each server framework or serverless function service will handle file uploads differently, so you will have to look at your server-side code's documentation to find out how to access and read the files that were uploaded through the browser. Keep in mind, though, that since the files were attached to the `formData` object with a specific `name` argument, then they would probably be available on a property that has the same name that was passed to the `name` parameter. For example, if `"userFiles"` was passed to the `name` parameter, then the files would be available on a `userFiles` property somewhere in the request object. But, again, read your server-side code's documentation to find out how to access and read the files that were uploaded.

**IMPORTANT NOTE: The argument that is passed to the `name` parameter in this `<DropZone>` component is `"files"`. So if you use this `<DropZone>` component, then any files that are uploaded through this component would probably be available on a `"files"` property.**

<br>

## How to limit the accepted file types
You can use the `accept` prop to limit the acceptable file types. If you do, then you will see that the file picker only lets you select the file types specified in the `accept` value. However, keep the following note from MDN in mind:

*The `accept` attribute doesn't validate the types of the selected files; it provides hints for browsers to guide users towards selecting the correct file types. It is still possible (in most cases) for users to toggle an option in the file picker that makes it possible to override this and select any file they wish, and then choose incorrect file types.*

*Because of this, you should make sure that the `accept` attribute is backed up by appropriate server-side validation.*

*Source: [`<input type="file">` - Limiting accepted file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#limiting_accepted_file_types)*

<br>

<!-- <br>

<div><b>Files in the storage bucket:</b></div>
{#if filesArray.length > 0}
  {#each filesArray as file (file.id)}
    <div class="file-wrapper">
      <div class="file-name">{file.id}</div>
      {#if loading}
        <button class="remove-file-btn" title="Delete file">
          <Icon icon="icomoon-free:spinner2" width="16" class="fp-spin" />
        </button>
      {:else}
        <button class="remove-file-btn" on:click={() => deleteFile(file.id)} title="Delete file">
          <Icon icon="ri:delete-bin-2-line" width="16" />
        </button>
      {/if}
    </div>
  {/each}
{:else}
  <div class="empty-container">Your container does not contain any files.</div>
{/if}

<br><br> -->

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `handleFileUploads` | `function` | Any function | NA | In order to get this component to work, you need to pass it a function named `handleFileUploads`. <br><br> The `handleFileUploads` signature needs to be `async function handleFileUploads(formData)`. The `formData` argument is a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object that contains a [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList) object, which contains the list of files that were selected/dropped in the `<DropZone>` component. <br><br> The body of your `handleFileUploads` function should be the API code for uploading files to your cloud storage service. |
| `accept` | `string` | See the "Description" to the right. | `"*"` (All file types are accepted) | This prop allows you to provide a [unique file type specifier](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers). The `accept` prop in this component works exactly the same as the `accept` attribute in an `<input type="file">` element.<br><br>For details on what you can pass to this prop, see [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept), [Unique file type specifier](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers), and [Limiting accepted file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#limiting_accepted_file_types). |
| `dragAndDropIcon` | `string` | Any icon name from the Iconify library. | `pixelarticons:drag-and-drop` | The icon that is passed to this prop will display in the drag and drop area. |
| `dropZoneSelectFilesBtnIcon` | `string` | See `dragAndDropIcon`. | See `dragAndDropIcon`. | See `dragAndDropIcon`. |
| `dropZoneUploadFilesBtnIcon` | `string` | See `dragAndDropIcon`. | See `dragAndDropIcon`. | See `dragAndDropIcon`. |

<br>

## Slots
| Slot name | Default value | Description |
| --------- | ------------- | ----------- |
| Default slot (optional) | `Or Drag & Drop Files Here` | The text/instructions that will be displayed in the drop zone. |

<br><br><br>

# Tutorial

This tutorial will show you how to create a custom drop zone component. Then you can integrate your drop zone component with your cloud storage service.

The final version from this tutorial will be identical to the component in the "Example Usage" section above.

A file upload component is much more than just the frontend code. It might be better to describe the content of this tutorial as a file upload *feature* rather than just a file upload component. Before I can explain how to create a file upload feature, let me start with some foundational concepts.


## What is binary data?
For computers to understand, process, and store data, those data have to be converted to **binary data**, known as **bits** or **binary digits** (i.e. 1's and 0's).

A **byte** is a data type that contains 8 bits. A single character (e.g., `d`, `5`, `!`) takes up one byte of storage space, so you can also think of a byte as one character. For example, the letter "h" is one byte, or eight bits, and the word "hope" has four bytes or 32 bits (4 x 8 bits).

Visually, bits and bytes look like this:

<table id="bits" class="responsive-table">
  <tr>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
  </tr>
</table>

One box represents one bit. All 8 boxes represents one byte.

Every piece of data sent to the computer is first converted to binary data by a microprocessor before processing and outputting the result.

*NOTE: The number of bits per character is actually a bit more complex than what I explained above, but it works for our purposes. You can read more at this post: [How many bits or bytes are there in a character?](https://stackoverflow.com/a/4850316/9453009)*


## What is a buffer?
Here's a simplified way of explaining what a buffer is:

*Imagine that you're eating candy out of a bowl. You take one piece regularly. To prevent the bowl from running out, someone might refill the bowl before it gets empty, so that when you want to take another piece, there's candy in the bowl. The bowl acts as a buffer between you and the candy bag.*

*If you're watching a movie online, the web service will continually download the next 5 minutes or so into a buffer, that way your computer doesn't have to download the movie as you're watching it (which would cause hanging).*
(Reference: https://stackoverflow.com/a/648324/9453009)

Here's another description:

*The term "buffer" is a very generic term, and is not specific to IT or CS. It's a place to store something temporarily, in order to mitigate differences between input speed and output speed. While the producer is being faster than the consumer, the producer can continue to store output in the buffer. When the consumer gets around to it, it can read from the buffer. The buffer is there in the middle to bridge the gap.* (Reference: https://stackoverflow.com/a/648315/9453009)

**A buffer is a temporary storage location (in memory) that is used to hold a chunk of data. For example, when data are sent to a destination, those data need to be stored somewhere (e.g. a buffer) until the destination is ready to take in more chunks of data for processing.**

In the case of file uploads, the data are the files and the destination is determined by how those files are uploaded. For example, if you upload files from your browser-side code directly to your cloud storage, then the destination (i.e. the location that needs to buffer the data) is your cloud storage service. If, however, you upload files from your browser-side code to your server-side code and then to your cloud storage, then you have to two destinations that need to buffer the data: your server-side code and your cloud storage.

You can think of a buffer like an array of integers and each integer represents a byte of data. This is an example of what a buffer looks like:

```
<Buffer 43 68 61 6e 67 65 20 6d 65 20 74 6f 20 62 75 66 66 65 72>
```

So you can imagine a buffer as an array of bytes, like this:

<table id="bits" class="responsive-table">
  <tr>
    <td class="symbol">[</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td class="symbol">,</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td class="symbol">,</td>
    <td>0</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td class="symbol">,</td>
    <td class="symbol">...</td>
    <td class="symbol">]</td>
  </tr>
</table>

<br>

Node.js has a **[Buffer](https://nodejs.dev/learn/nodejs-buffers)** module that you can use to work with buffers.


## How to read files in Node.js
*You can watch this video for a great explanation of [Streams and Buffers](https://www.youtube.com/watch?v=GlybFFMXXmQ).*

In order for a computer to read files it first needs to convert those files into a form that it can understand, which is binary data. More specifically, you need to convert your files into buffers (because a buffer is a byte array - i.e. an array of binary digits).

**Buffers** are created in memory. So in order to convert files into a buffer you have to create space in memory that is equal to the size of the file being converted. For example, a 1MB file will use 1MB of memory. That might not sound like a big deal, but what happens if you have a lot of users concurrently uploading files to your server? Too much memory usage at one time can slow down or even crash your server.

**Streams** are a way to read small chunks of data (i.e. small buffers) at a time rather than one massive file all at once. So when your programs read a file as a stream they read it piece by piece, processing its content without keeping it all in memory. That means that streams allow your programs to read much larger files while using less memory. If you don't use streams to read files, then you will have to wait for the entire file to be read before it can be processed, which can use up more memory.

In Node.js, you can use the [`fs`](https://nodejs.dev/learn/the-nodejs-fs-module) module to open and read files. There are two ways you can open and read a file using the `fs` module:

* Load all of the contents at once (buffering)
* Incrementally load contents (streaming)

Keep in mind that the `fs` module is used to access and interact with the file system. So any files that you want to read with the `fs` module have to be located in the computer's file system already (or on your server's file system in the case of web development). For example, the `fs.readFile()` method takes a file path as its first argument. You cannot pass a `File` object (i.e. a file that was uploaded through the browser) as the first argument to `fs.readFile()`.

So, if you can't use the `fs` module to read file uploads, then how do you read files that have been uploaded by a user? That depends on the server-side framework that you are using. Each server framework or serverless function service will handle file uploads differently, so you will have to look at your server-side code's documentation to find out how to access and read the files that were uploaded through the browser.

### FYI

1. Node.js has a **[Stream](https://nodejs.dev/learn/nodejs-streams)** module that you can use to work with streams. You can read more about streams in Node.js and how to implement them:
    * [Node.js Streams](https://nodejs.dev/learn/nodejs-streams)
    * [Read Files with Node.js](https://stackabuse.com/read-files-with-node-js/)
    * [Node HTTP Servers for Static File Serving](https://stackabuse.com/node-http-servers-for-static-file-serving/)

2. Buffers were introduced to help developers deal with binary data in an ecosystem that traditionally only dealt with strings rather than binaries.

3. JavaScript in the browser does not have access to the `fs` module. If you are trying to read a file in the browser, then you would have to use the [`FileReader` API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader). *" `FileReader` can only access the contents of files that the user has explicitly selected, either using an HTML `<input type="file">` element or by drag and drop. It cannot be used to read a file by pathname from the user's file system. To read files on the client's file system by pathname, use the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API). To read server-side files, use standard Ajax solutions, with CORS permission if reading cross-domain." (Source: [FileReader docs on MDN](https://developer.mozilla.org/en-US/docs/Web/API/FileReader))*


### References
* [Binary Data](https://www.techopedia.com/definition/17929/binary-data#:~:text=Binary%20data%20is%20a%20type,combination%20of%20zeros%20and%20ones.)
* [Understanding Bits, Bytes and Their Multiples](https://www.techopedia.com/2/29184/development/programming-languages/understanding-bits-bytes-and-their-multiples)
* [Node.js buffer: A complete guide](https://blog.logrocket.com/node-js-buffer-a-complete-guide/)
* [Node.js Buffers](https://nodejs.dev/learn/nodejs-buffers)
* [Node.js Streams](https://nodejs.dev/learn/nodejs-streams)


## What are Blobs?
When working with file uploads you will often see the term "blob" used. Blob stands for **B**inary **L**arge **Ob**ject, which includes objects such as images and multimedia files. These are known as unstructured data because they don't follow any particular data model. *(Source: [SnapLogic - Azure Blob Storage](https://www.snaplogic.com/glossary/azure-blob-storage#:~:text=Azure%20Blob%20storage%20is%20a,as%20images%20and%20multimedia%20files.))*




## Create the frontend component
Now that we have some of those preliminaries out of the way, let's get into creating the file upload feature.

---

SvelteKit uses Vite to bundle its files. Vite uses the `dotenv` package to load your environment variables from `.env` files, so you do not need to install the `dotenv` package in order to load environment variables from `.env` files. However, you do need to remember to prefix each environment variable with `PUBLIC_`.

TODOS:
* At this point in the Quickstart: [Create a SAS connection string](https://docs.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser#create-a-sas-connection-string) I need to find out if the Azure Storage "Start and expiry date/time" auto-renews or if that expiration permanent?
* Include this link to the Azure SDK for JavaScript: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#list-the-containers

* Containers are like folders.


<style>
  table#bits {
    width: auto;
    font-family: mono;

    & tr {
      border: none;
    }

    & td {
      padding: 5px 10px;
      border: 1px solid #c7c7c7;
    }

    & .symbol {
      border: none;
      font-size: 2rem;
      line-height: 1rem;
    }
  }

  .file-wrapper {
    display: flex;
    border-bottom: 1px dotted #343434;
    margin: 10px 0;
    text-align: left;

    & .file-name {
      flex: 1;
      padding: 5px;
      padding-left: 0;
      color: #343434;
      background-color: white;
    }

    & .remove-file-btn {
      padding: 0;
      border: none;
      margin-left: 5px;
      outline: none;
      background-color: transparent;
      color: inherit;
      cursor: pointer;
    }
  }

  .empty-container {
    margin: 10px 0;
  }
</style>
