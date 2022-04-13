// Import stylesheets
import './style.css';

// Import Formio Export Tools Library
import FormioExport from 'formio-export';
import Submission from './submission.json';
import Wizard from './wizard.json';

// Import helper functions
import { getRandomId, getDate, createIframe } from './helpers';

// Get the app div element
const appDiv = document.getElementById('app');

// Define the component using Form.io's Component JSON Schema
let component = {
  type: 'form',
  title: 'Example',
  display: 'form',
  components: [
    {
      type: 'panel',
      legend: 'Contact Information',
      input: false,
      components: [
        {
          type: 'textfield',
          key: 'name',
          label: 'Name',
          input: true
        },
        {
          type: 'number',
          key: 'age',
          label: 'Age',
          input: true
        },
        {
          type: 'select',
          label: 'Gender',
          input: true,
          key: 'gender',
          dataSrc: 'values',
          data: {
            values: [
              {
                label: 'Female',
                value: 'f'
              },
              {
                label: 'Male',
                value: 'm'
              },
              {
                label: 'Other',
                value: 'o'
              }
            ]
          },
          template: '<span>{{ item.label }}</span>',
        },
        {
          type: 'columns',
          columns: [
            {
              components: [
                {
                  type: 'email',
                  label: 'Email',
                  input: true,
                  key: 'email'
                }
              ]
            },
            {
              components: [
                {
                  type: 'phoneNumber',
                  label: 'Phone',
                  input: true,
                  key: 'phone'
                }
              ]
            }
          ]
        },
        {
          type: 'survey',
          key: 'feedback',
          label: 'Feedback',
          input: true,
          questions: [
            {
              value: 'question1',
              label: 'How are you feeling today?'
            },
            {
              value: 'question2',
              label: 'How would you rate the service provided so far?'
            }
          ],
          values: [
            {
              value: '1',
              label: 'Terrible'
            },
            {
              value: '2',
              label: 'Bad'
            },
            {
              value: '3',
              label: 'Regular'
            },
            {
              value: '4',
              label: 'Good'
            },
            {
              value: '5',
              label: 'Excellent'
            }
          ]
        }
      ]
    },
  ]
};
// Define a Form.io submission
let sub = {
  _id: getRandomId(),
  owner: getRandomId(),
  modified: getDate(),
  data: {
    name: 'John Doe',
    gender: 'm',
    email: 'john.doe@example.org',
    phone: '(555) 123-4567',
    feedback: {
      question1: '2',
      question2: '4'
    }
  }
};

// Define additional configurations
let options = {
  formio: {
    ignoreLayout: true,
    emptyValue: '-'
  }
}

// Define new instance of FormioExport
//const exporter = new FormioExport(component, sub, options);
const exporter = new FormioExport(Wizard, Submission, options);

// Render the component to HTML
document.getElementById('btn-html').addEventListener('click', () => {
  exporter.toHtml().then((html) => {
    html.style.margin = 'auto';
    let iframe = createIframe(appDiv);
    let doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.body.appendChild(html);
  });
});

// Export to PDF data uri string
document.getElementById('btn-pdf').addEventListener('click', () => {
  let config = {
    download: false,
    filename: 'example.pdf',
    html2canvas: {
      logging: true,
      onclone: (doc) => {
        // You can modify the html before converting it to canvas (add additional page breaks, etc)
        console.log('html cloned!', doc);
      },
      onrendered: (canvas) => {
        // You can access the canvas before converting it to PDF
        console.log('html rendered!', canvas);
      }
    }
  }

  exporter.toPdf(config).then((pdf) => {
    console.log('pdf ready', pdf)
    let iframe = createIframe(appDiv);
    iframe.src = pdf.output('datauristring');
  });
});

// Initialize the app
document.getElementById('btn-html').click();
