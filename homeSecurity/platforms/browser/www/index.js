/*index0
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(document).ready(function () {
  document.addEventListener("deviceready", onDeviceReady.bind(this), false);
  document.getElementById('login-button').addEventListener("click", getAuth);

  // document.getElementById("login-button").style.display = "none";
  // document.getElementById("no-auth").style.display = "none";
  onDeviceReady();
});


function onDeviceReady(){
  $(window).unbind();
  $('#login-button').hide();
  $('#no-auth').hide();
  getnfc();
  // document.getElementById('login-button').addEventListener("click", FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError));
  // alert(FingerprintAuth);
  // FingerprintAuth.isAvailable(isAvailableSuccess, isAvailableError);
}

function getnfc() {
  nfc.addNdefListener (
    function (nfcEvent) {
      var tag = nfcEvent.tag;
      var ndefMessage = tag.ndefMessage;
      var message = nfc.bytesToString(ndefMessage[0].payload).substring(3);
      // var log = document.getElementById("login-button");
      // var no_auth = document.getElementById("no-auth");
      if(message != "beetlejuice"){
        // alert("no");
        $('#login-button').hide();
        $('#no-auth').show();
      };
      if(message == "beetlejuice"){
        // alert("Bienvenido");
        $('#no-auth').hide();
        $('#login-button').show();
      };
      // dump the raw json of the message
      // note: real code will need to decode
      // the payload from each record
      //alert(JSON.stringify(ndefMessage));

      // assuming the first record in the message has
      // a payload that can be converted to a string.
      // alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
    },
    function () { // success callback
      // alert("Por favor escanea tu tarjeta");
    },
    function (error) { // error callback
      alert("Error" + JSON.stringify(error));
    }
  );
}

function isAvailableSuccess(result) {
  console.log("FingerprintAuth available: " + JSON.stringify(result));
  if (result.isAvailable) {
    var encryptConfig = {
      clientId: "myAppName",
      username: "currentUser",
      password: "currentUserPassword"
    };
  FingerprintAuth.encrypt(encryptConfig, encryptSuccessCallback, encryptErrorCallback);
    function encryptSuccessCallback(result) {
      console.log("encryptSuccessCallback(): " + JSON.stringify(result));
      if (result.withFingerprint) {
        console.log("Successfully encrypted credentials.");
        console.log("Encrypted credentials: " + result.token);
      };
      else if (result.withBackup) {
        console.log("Authenticated with backup password");
      };
    };
    function encryptErrorCallback(error) {
      if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
        console.log("FingerprintAuth Dialog Cancelled!");
      };
      else {
        console.log("FingerprintAuth Error: " + error);
      };
    };
  };
};

function isAvailableError(message) {
  console.log("isAvailableError(): " + message);
};
