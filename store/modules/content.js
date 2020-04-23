import moment from 'moment-timezone';

const state = () => ({
  bar: {
    backgroundVideo:
      'https://player.vimeo.com/external/401375408.hd.mp4?s=bbf37b1601af62db2a1758fd0d63b6f23c5f2623&profile_id=175"',
    title: 'No Drinks. Only Donations.',
    services: [
      {
        title: 'Support the CLUB QUARANTÄNE Team',
        text:
          '<p>If you enjoy Club Quarantäne and would like to help make more editions possible, please consider supporting the team behind the project with a donation.</p> <p>Please note: All ticket donations purchased on RA will be distributed fairly to the team who have built the virtual club.</p>',
        linkText: 'Donate',
        link: 'https://www.residentadvisor.net/events/1407334'
      },
      {
        title: 'Movement On The Ground',
        text:
          '<p>We are a foundation responding to a humanitarian crisis affecting innocent people forced to flee from their homes.</p>',
        linkText: 'Donate',
        link: 'https://movementontheground.com/donation'
      }
    ]
  },
  cloakroom: {
    backgroundVideo: null,
    title: 'Cloakroom',
    text:
      '<p><a href="https://shop.clubquarantaene.stream/" rel="noopener noreferrer" target="_blank">Cloakroom↗</a></p>'
  },
  imprint: {
    backgroundVideo: null,
    title: 'Imprint',
    text:
      '<h2>Responsible for content according to § 5 TMG</h2> <p>Invisible Hand GbR<br /> Urbanstr. 115<br /> 10967 Berlin</p> <p>+49 30 24 53 44 89<br /> handshake@invisiblehand.agency</p> <h2>Club Quarantäne brought to you by</h2> <p>Invisible Hand</p> <h3>Concept & Project Management</h3> <p>No Service 24/7</p> <h3>Communication</h3> <p>ungroup group</p> <h3>Webdesign & Development</h3> <p>Dario Dammé / Multisex</p> <h3>Creative Assistant</h3> <p>Sam Aldridge / Multisex / Selam X</p> <h3>Visual Director & Coordinator</h3> <p>Maximilian Kreis<br /> Jannis Szeder<br /> Clifford Kent Sage</p> <h3>Visual Artists</h3> <p>200kilo<br /> Jung&Dynamisch</p> <h3>Graphics</h3> <p>Off World Live<br /> Stream Host</p> <p>Countersubject</p> <h3>Mixing & Mastering</h3> <p>POLY. Artists</p> <h3>Fundraising</h3> <p>Resident Advisor<br /> YouTube</p> <h2>Typeface</h2> <p>ABC Viafont by Dinamo</p> <p>The live-stream is using a new, interactive, 2D and 360 streaming system for games engines built by Off World Live.</p> <h2>Privacy Information</h2> <p>Invisible Hand GbR, Urbanstr. 115, 10967 Berlin (hereinafter “we”, “us” and “our”) runs this website and therefore processes personal data pursuant to the EU General Data Protection Regulation (“GDPR”). You may reach out to us by writing a letter to the aforementioned address or via e-mail: handshake@invisiblehand.agency Where we use the term “data”, we are referring to personal data within the meaning of the GDPR.</p> <ol> <li>Website Visitors<br /> a) Server protocol data<br /> Our web server processes a series of data for each request, which your browser automatically transmits to our web server. This data comprises the IP address currently assigned to your device, the date and time of the request, the time zone, the specific page or file called up, the http status code and the amount of data transferred. Additionally, the website from which your request came, the browser used, the operating system of your end device and the set language. The web server uses this data to display the contents of this website in the best possible way on your device.</li> </ol> <p>d) The purpose of data processing is to present us on the internet and to communicate with our fans, customers and business partners. The purpose of analyzing some user behavior on our website is to design the website in line with the requirements of our users and website visitors.</p> <p>e) The legal basis for processing the data is Art. 6 (1) lit. b) GDPR based on the contract of use of our website. The legal basis for the analysis of user behavior is Art. 6 (1) lit. f) GDPR, our legitimate interest is to provide our visitors with a demand-oriented design of our website.</p> <p>f) It is not possible to use our website without disclosure of protocol data such as your IP address. Protocol and communication data will not be transferred to third parties unless special circumstances require us to do so, e.g. if a criminal offence is suspected or in the course of an investigation. In these cases, data may be transferred to the police and/or the public prosecutor’s office.</p> <ol start="3"> <li>Communication and Contractual Obligations<br /> a) When you reach out to us via email or otherwise, we process the data you provide us with for the purpose of performing our obligations with regard to our contractual relationship or its preparation and/or any other communication purposes. This also includes consulting and information requests.</li> </ol> <p>b) In this event, the legal basis for processing your data is Art. 6 (1) lit. b) GDPR based on a contractual relationship or the initiation of a contractual relationship and/or Article 6 (1) lit. c) GDPR where we are legally obliged to do so, in particular pursuant to applicable tax and commercial law provisions. In any case, the legal basis for processing your contact data is Article 6 (1) lit. f) GDPR, our legitimate interest is to enter into the communication with you.</p> <p>c) All data relevant to contracts and book keeping shall be stored for a period of ten (10) calendar years after the end of our contractual relationship pursuant to obligations based on tax and commercial law provisions.</p> <p>d) The provision of your contact data is obligatory where you want us to enter into a communication with you. Contractual relationships cannot be established and carried out without the basic contractual data.</p> <ol start="4"> <li>Rights of Data Subjects<br /> a) We do not use any methods of automated individual decision-making.</li> </ol> <p>b) At any time, you have the right to request information about all your Data which we are processing. Furthermore, if your Data is incorrect or incomplete, you have the right to have it rectified and completed. You can also request the erasure of your Data at any time, unless we are legally obliged to continue processing your Data.</p> <p>c) Where applicable legal requirements are met, you can request a restriction to the processing of your Data. You also have the right to object to the processing, insofar as the data processing is based on profiling or direct marketing purposes.</p> <p>d) Where we process your Data on the basis of your consent or a contract, you have the right to transfer the Data provided by you, insofar as the rights and freedoms of others remain unaffected. Where we process your Data on the basis of a declaration of consent, you have the right to revoke such consent at any time with future effect. The processing carried out prior to a revocation remains unaffected by the revocation.</p> <p>e) Where you believe that we process your Data in violation of the applicable law, you have the right to file a complaint with a data protection supervisory authority at any time.</p>'
  },
  timetable: [
    {
      name: 'DARWIN',
      start: '22:00',
      end: '23:30',
      day: '2020-04-24'
    },
    {
      name: 'ZENKER BROTHERS ',
      start: '23:30',
      end: '01:00',
      day: '2020-04-25'
    },
    {
      name: 'EMMA DJ & LEMAIRE',
      start: '01:00',
      end: '02:30',
      day: '2020-04-25'
    },
    {
      name: 'FJAAK',
      start: '02:30',
      end: '04:00',
      day: '2020-04-25'
    },
    {
      name: 'AKUA0',
      start: '04:00',
      end: '05:30',
      day: '2020-04-25'
    },
    {
      name: 'ROOG UNIT [LUKE SLATER. + Ø [PHASE] ]',
      start: '05:30',
      end: '07:00',
      day: '2020-04-25'
    },
    {
      name: 'TIJANA T',
      start: '07:00',
      end: '08:45 ',
      day: '2020-04-25'
    },
    {
      name: 'CORA',
      start: '08:45',
      end: '10:15',
      day: '2020-04-25'
    },
    {
      name: 'COLORED CRAIG',
      start: '10:15',
      end: '11:45',
      day: '2020-04-25'
    },
    {
      name: 'BEN UFO',
      start: '11:45',
      end: '13:15',
      day: '2020-04-25'
    },
    {
      name: 'ASH LAURYN',
      start: '13:15',
      end: '14:45',
      day: '2020-04-25'
    },
    {
      name: 'D. TIFFANY',
      start: '14:45',
      end: '16:15',
      day: '2020-04-25'
    },
    {
      name: 'BEAUTIFUL SWIMMERS',
      start: '16:15',
      end: '17:45',
      day: '2020-04-25'
    },
    {
      name: 'BYRON YEATES',
      start: '17:45',
      end: '19:00',
      day: '2020-04-25'
    },
    {
      name: 'MOMA READY',
      start: '19:00',
      end: '20:30',
      day: '2020-04-25'
    },
    {
      name: 'ND_BAUMECKER',
      start: '20:30',
      end: '22:00',
      day: '2020-04-25'
    },
    {
      name: 'DISKONNECTED',
      start: '22:00',
      end: '23:30',
      day: '2020-04-25'
    },
    {
      name: 'SLIKBACK',
      start: '23:30',
      end: '01:00',
      day: '2020-04-26'
    },
    {
      name: 'CASHU',
      start: '01:00',
      end: '02:30',
      day: '2020-04-26'
    },
    {
      name: 'EXTERMINADOR',
      start: '02:30',
      end: '04:00',
      day: '2020-04-26'
    },
    {
      name: 'ANETHA',
      start: '04:00',
      end: '05:30',
      day: '2020-04-26'
    },
    {
      name: 'DAX J',
      start: '05:30',
      end: '07:00',
      day: '2020-04-26'
    },
    {
      name: 'JULIANNA',
      start: '07:00',
      end: '08:30',
      day: '2020-04-26'
    },
    {
      name: 'JAYDA G',
      start: '08:30',
      end: '10:30',
      day: '2020-04-26'
    }
  ],
  // OLD STATE AFTER THIS
  eventIsRunning: null,
  eventIsOver: null,
  currentQuestion: 0,
  questions: [
    {
      question: 'Question 1?',
      isCookieQuestion: false
    },
    {
      question: 'Question 2?',
      isCookieQuestion: false
    },
    {
      question: 'Question 3 Cookie?',
      isCookieQuestion: true
    }
  ],
  questionsAnswered: false
});

const mutations = {
  setContent(state, data) {
    state.data = data;
    state.data.event.start = moment.tz(state.data.event.start, 'Europe/Berlin');
    state.data.event.end = moment.tz(state.data.event.end, 'Europe/Berlin');
    state.eventIsRunning = moment()
      .tz('Europe/Berlin')
      .isBetween(state.data.event.start, state.data.event.end);
    state.eventIsOver = moment()
      .tz('Europe/Berlin')
      .isAfter(state.data.event.end);
  }
};

const actions = {
  setContent({ commit }, data) {
    commit('setContent', data);
  }
};

export default {
  state,
  mutations,
  actions
};
