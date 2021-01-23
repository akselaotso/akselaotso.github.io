<?php
  $EmailFrom = "Yoursite";
  $EmailTo = "akso@aksela.net";
  $Subject = "From akso.aksela.net";
  $Name = Trim(stripslashes($_POST['Name'])); 
  $Sub = Trim(stripslashes($_POST['Subject'])); 
  $Email = Trim(stripslashes($_POST['Email'])); 
  $Message = Trim(stripslashes($_POST['Message'])); 

  // validation
  $validationOK=true;
  if (!$validationOK) {
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.htm\">";
    exit;
  }

  
  $Body = "";
  $Body .= "Name: ";
  $Body .= $Name;
  $Body .= "\n";
  $Body .= "Email: ";
  $Body .= $Email;
  $Body .= "\n";
  $Body .= "Subject: ";
  $Body .= $Sub;
  $Body .= "\n";
  $Body .= "Message: ";
  $Body .= $Message;
  $Body .= "\n";

  // send email
  if (strpos($Email, "@") !== false) { 
    $success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");
  }
  
  // redirect to success page 
  if ($success){
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.htm\">";
  }
  else{
    print "<meta http-equiv=\"refresh\" content=\"0;URL=index.htm\">";
  }
?>