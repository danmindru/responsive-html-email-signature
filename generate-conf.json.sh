#!bin/sh

# script for dynamic interactive creation of conf.json file

# If variable not set or null, set to some exemplary defaults.
theme="${1:-light}"
mobile_phone_country_code="${2:-45}"  
mobile_phone_number="${3:-80100100}"
email_address="${4:-info@${theme}.dk}" 

echo $theme

conf_file_path="./templates/$theme/conf.json"
touch $conf_file_path
echo {                                                              > $conf_file_path
echo    "\"id"\": "\"$theme"\",                                     >> $conf_file_path
echo    "\"signature"\": "\"Best regards,"\",                       >> $conf_file_path
echo    "\"name"\": "\"The $theme mail team"\",                     >> $conf_file_path
echo    "\"contactMain"\": "\"Call <a href='tel:00$mobile_phone_country_code$mobile_phone_number'><span>($mobile_phone_country_code) $mobile_phone_number</span></a> or email us at"\", >> $conf_file_path
echo    "\"contactMail"\": "\"$email_address"\",                    >> $conf_file_path
echo    "\"slogan"\": "\"LED Pylon. LED Wall. Digital Signage."\",  >> $conf_file_path
echo    "\"logoUrl"\": "\"/assets/$theme.png"\",                    >> $conf_file_path
echo    "\"logoAlt"\": "\"$theme logo"\",                           >> $conf_file_path
echo    "\"website"\": "\"http://$theme.dk"\"                       >> $conf_file_path
echo }                                                              >> $conf_file_path
