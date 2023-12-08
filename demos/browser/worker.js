/* global tus */
"use strict"


function startUpload(file) {
    // Only continue if a file has actually been selected.
    // IE will trigger a change event even if we reset the input element
    // using reset() and we do not want to blow up later.
    if (!file) {
      return
    }
  
    const endpoint = "https://tusd.tusdemo.net/files/"
    let chunkSize = 10 * 1024 * 1024
    if (Number.isNaN(chunkSize)) {
      chunkSize = Infinity
    }
  
    let parallelUploads = 1 //parseInt(parallelInput.value, 10)
    if (Number.isNaN(parallelUploads)) {
      parallelUploads = 1
    }
  

    const options = {
        endpoint,
        chunkSize,
        retryDelays: [0, 1000, 3000, 5000],
        parallelUploads,
        metadata: {
            filename: file.name,
            filetype: file.type,
        },
        onError(error) {
            if (error.originalRequest) {
            if (self.confirm(`Failed because: ${error}\nDo you want to retry?`)) {
                upload.start()
                //uploadIsRunning = true
                return
            }
            } else {
                self.alert(`Failed because: ${error}`)
            }
    
            reset()
        },
        onProgress(bytesUploaded, bytesTotal) {
            const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
            //progressBar.style.width = `${percentage}%`
            console.log(bytesUploaded, bytesTotal, `${percentage}%`)
        },
        onSuccess() {
            /*const anchor = document.createElement('a')
            anchor.textContent = `Download ${upload.file.name} (${upload.file.size} bytes)`
            anchor.href = upload.url
            anchor.className = 'btn btn-success'
            uploadList.appendChild(anchor)
    
            reset()*/
            console.log("Successfully uploaded ", file.name)
        },
    }
    
    
    
    /*
    upload = new Upload(file, options)
    upload.findPreviousUploads().then((previousUploads) => {
      askToResumeUpload(previousUploads, upload)
  
      upload.start()
      uploadIsRunning = true
    })
    */
}

addEventListener('message', ({ data }) => {
    console.log(data, 'data in worker')
    startUpload(data)
    const response = `worker response`;
    postMessage(response);
});
  

