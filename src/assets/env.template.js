(function(window) {
    window.env = window.env || {};
  
    // Environment variables
    window["env"]["backendApi"] = "${BACKEND_API}";
    window["env"]["submissionApi"] = "${SUBMISSION_API}";
  })(this);