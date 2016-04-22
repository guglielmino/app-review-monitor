'use strict';

const appStoreLanguages = [
  {code: 'AE', description: 'United Arab Emirates'},
  {code: 'AG', description: 'Antigua and Barbuda'},
  {code: 'AI', description: 'Anguilla'},
  {code: 'AL', description: 'Albania'},
  {code: 'AM', description: 'Armenia'},
  {code: 'AO', description: 'Angola'},
  {code: 'AR', description: 'Argentina'},
  {code: 'AT', description: 'Austria'},
  {code: 'AU', description: 'Australia'},
  {code: 'AZ', description: 'Azerbaijan'},
  {code: 'BB', description: 'Barbados'},
  {code: 'BE', description: 'Belgium'},
  {code: 'BF', description: 'Burkina Faso'},
  {code: 'BG', description: 'Bulgaria'},
  {code: 'BH', description: 'Bahrain'},
  {code: 'BJ', description: 'Benin'},
  {code: 'BM', description: 'Bermuda'},
  {code: 'BN', description: 'Brunei'},
  {code: 'BO', description: 'Bolivia'},
  {code: 'BR', description: 'Brazil'},
  {code: 'BS', description: 'Bahamas'},
  {code: 'BT', description: 'Bhutan'},
  {code: 'BW', description: 'Botswana'},
  {code: 'BY', description: 'Belarus'},
  {code: 'BZ', description: 'Belize'},
  {code: 'CA', description: 'Canada'},
  {code: 'CG', description: 'Republic Of Congo'},
  {code: 'CH', description: 'Switzerland'},
  {code: 'CL', description: 'Chile'},
  {code: 'CN', description: 'China'},
  {code: 'CO', description: 'Colombia'},
  {code: 'CR', description: 'Costa Rica'},
  {code: 'CV', description: 'Cape Verde'},
  {code: 'CY', description: 'Cyprus'},
  {code: 'CZ', description: 'Czech Republic'},
  {code: 'DE', description: 'Germany'},
  {code: 'DK', description: 'Denmark'},
  {code: 'DM', description: 'Dominica'},
  {code: 'DO', description: 'Dominican Republic'},
  {code: 'DZ', description: 'Algeria'},
  {code: 'EC', description: 'Ecuador'},
  {code: 'EE', description: 'Estonia'},
  {code: 'EG', description: 'Egypt'},
  {code: 'ES', description: 'Spain'},
  {code: 'FI', description: 'Finland'},
  {code: 'FJ', description: 'Fiji'},
  {code: 'FM', description: 'Federated States Of Micronesia'},
  {code: 'FR', description: 'France'},
  {code: 'GB', description: 'United Kingdom'},
  {code: 'GD', description: 'Grenada'},
  {code: 'GH', description: 'Ghana'},
  {code: 'GM', description: 'Gambia'},
  {code: 'GR', description: 'Greece'},
  {code: 'GT', description: 'Guatemala'},
  {code: 'GW', description: 'Guinea-Bissau'},
  {code: 'GY', description: 'Guyana'},
  {code: 'HK', description: 'Hong Kong'},
  {code: 'HN', description: 'Honduras'},
  {code: 'HR', description: 'Croatia'},
  {code: 'HU', description: 'Hungary'},
  {code: 'ID', description: 'Indonesia'},
  {code: 'IE', description: 'Ireland'},
  {code: 'IL', description: 'Israel'},
  {code: 'IN', description: 'India'},
  {code: 'IS', description: 'Iceland'},
  {code: 'IT', description: 'Italy'},
  {code: 'JM', description: 'Jamaica'},
  {code: 'JO', description: 'Jordan'},
  {code: 'JP', description: 'Japan'},
  {code: 'KE', description: 'Kenya'},
  {code: 'KG', description: 'Kyrgyzstan'},
  {code: 'KH', description: 'Cambodia'},
  {code: 'KN', description: 'St. Kitts and Nevis'},
  {code: 'KR', description: 'Republic Of Korea'},
  {code: 'KW', description: 'Kuwait'},
  {code: 'KY', description: 'Cayman Islands'},
  {code: 'KZ', description: 'Kazakstan'},
  {code: 'LA', description: 'Lao People’s Democratic Republic'},
  {code: 'LB', description: 'Lebanon'},
  {code: 'LC', description: 'St. Lucia'},
  {code: 'LK', description: 'Sri Lanka'},
  {code: 'LR', description: 'Liberia'},
  {code: 'LT', description: 'Lithuania'},
  {code: 'LU', description: 'Luxembourg'},
  {code: 'LV', description: 'Latvia'},
  {code: 'MD', description: 'Republic Of Moldova'},
  {code: 'MG', description: 'Madagascar'},
  {code: 'MK', description: 'Macedonia'},
  {code: 'ML', description: 'Mali'},
  {code: 'MN', description: 'Mongolia'},
  {code: 'MO', description: 'Macau'},
  {code: 'MR', description: 'Mauritania'},
  {code: 'MS', description: 'Montserrat'},
  {code: 'MT', description: 'Malta'},
  {code: 'MU', description: 'Mauritius'},
  {code: 'MW', description: 'Malawi'},
  {code: 'MX', description: 'Mexico'},
  {code: 'MY', description: 'Malaysia'},
  {code: 'MZ', description: 'Mozambique'},
  {code: 'NA', description: 'Namibia'},
  {code: 'NE', description: 'Niger'},
  {code: 'NG', description: 'Nigeria'},
  {code: 'NI', description: 'Nicaragua'},
  {code: 'NL', description: 'Netherlands'},
  {code: 'NO', description: 'Norway'},
  {code: 'NP', description: 'Nepal'},
  {code: 'NZ', description: 'New Zealand'},
  {code: 'OM', description: 'Oman'},
  {code: 'PA', description: 'Panama'},
  {code: 'PE', description: 'Peru'},
  {code: 'PG', description: 'Papua New Guinea'},
  {code: 'PH', description: 'Philippines'},
  {code: 'PK', description: 'Pakistan'},
  {code: 'PL', description: 'Poland'},
  {code: 'PT', description: 'Portugal'},
  {code: 'PW', description: 'Palau'},
  {code: 'PY', description: 'Paraguay'},
  {code: 'QA', description: 'Qatar'},
  {code: 'RO', description: 'Romania'},
  {code: 'RU', description: 'Russia'},
  {code: 'SA', description: 'Saudi Arabia'},
  {code: 'SB', description: 'Solomon Islands'},
  {code: 'SC', description: 'Seychelles'},
  {code: 'SE', description: 'Sweden'},
  {code: 'SG', description: 'Singapore'},
  {code: 'SI', description: 'Slovenia'},
  {code: 'SK', description: 'Slovakia'},
  {code: 'SL', description: 'Sierra Leone'},
  {code: 'SN', description: 'Senegal'},
  {code: 'SR', description: 'Suriname'},
  {code: 'ST', description: 'Sao Tome and Principe'},
  {code: 'SV', description: 'El Salvador'},
  {code: 'SZ', description: 'Swaziland'},
  {code: 'TC', description: 'Turks and Caicos'},
  {code: 'TD', description: 'Chad'},
  {code: 'TH', description: 'Thailand'},
  {code: 'TJ', description: 'Tajikistan'},
  {code: 'TM', description: 'Turkmenistan'},
  {code: 'TN', description: 'Tunisia'},
  {code: 'TR', description: 'Turkey'},
  {code: 'TT', description: 'Trinidad and Tobago'},
  {code: 'TW', description: 'Taiwan'},
  {code: 'TZ', description: 'Tanzania'},
  {code: 'UA', description: 'Ukraine'},
  {code: 'UG', description: 'Uganda'},
  {code: 'US', description: 'United States'},
  {code: 'UY', description: 'Uruguay'},
  {code: 'UZ', description: 'Uzbekistan'},
  {code: 'VC', description: 'St. Vincent and The Grenadines'},
  {code: 'VE', description: 'Venezuela'},
  {code: 'VG', description: 'British Virgin Islands'},
  {code: 'VN', description: 'Vietnam'},
  {code: 'YE', description: 'Yemen'},
  {code: 'ZA', description: 'South Africa'},
  {code: 'ZW', description: 'Zimbabwe'}
];


export default class LangCommand {

  constructor(telegram, userProvider) {
    this.telegram = telegram;
    this.userProvider = userProvider;
  }

  execute(state, ...params) {
    let appId = 0;
    let appName = '';
    let langCode = null;

    if (params.length > 0 && params[0][0]) {
      langCode = params[0][0].toUpperCase();

      let message = '';
      const langItem  = appStoreLanguages.find(item => item.code === langCode);
      if (langItem) {
        message = `Store language set to *${langItem.description}*`;

        this.userProvider
          .updateLang(state.chat.username, langCode);
      }
      else {
        message = '*Wrong language code*\nUse one of\n';
        appStoreLanguages.forEach((item) => {
          message += `${item.code} = ${item.description}\n`;
        });
      }


      this.telegram.sendMessage({
        chat_id: state.chat.id,
        text: message,
        parse_mode: 'Markdown'
      });
    }
    
    return { lang: langCode};
  }
}
