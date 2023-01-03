import * as cron from 'node-cron';
import express from 'express';
import * as nodemailer from 'nodemailer';
import * as html_to_pdf from 'html-pdf-node';
import * as path from "path";
import { database } from './db/database.js';

const user = await database.raw('(select * from "user" where "userId"=? )', '7507');
const app = express();
app.use(express.static('public'))


const generatePdf = () => {
    let options = { format: 'A4' }
    let file = {
        content: `<html>
        <script src="http://localhost:9000/ploty.js"></script>
        
        <body>
            <div style="display: flex;flex-direction: column;row-gap: 10px;padding:2cm">
                <div style="display:flex;width: 100%;justify-content: space-between;">
                    <img style="width: 200px;" src="http://localhost:9000/logo_login.svg" alt="logo">
                    <h2 style="width: 40%;display: flex;justify-content: right;text-transform: uppercase;">Parts department
                        performance report</h2>
                </div>
                <div>
                    <h4 style="text-align: center;">GREENMARK EQUIPMENT (WI) (034997) - WINAMAC, IN</h4>
                    <h5 style="text-align: center;">October 01, 2020 - December 31, 2020</h5>
                    <div style="display: flex;">
                        <div style="width:50%">
                            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"
                                style="font-family:Calibri; font-size:20px; width:100%;">
                                <tr style="background-color: #D3D3D3;">
                                    <td colspan="8" style="border:1px solid black;vertical-align:text-top;padding:1px">
                                        Operational
                                        Data </td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">Mailed
                                    </td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">Returned
                                    </td>
                                </tr>
                                <tr style="background-color: #FFFFFF;">
                                    <td colspan="8" style="border:1px solid black;vertical-align:text-top;padding:1px">Current
                                        Quater</td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">211</td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">47</td>
                                </tr>
                                <tr style="background-color: #FFFFFF;">
                                    <td colspan="8" style="border:1px solid black;vertical-align:text-top;padding:1px">Rolling
                                        month
                                    </td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">805</td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">158</td>
                                </tr>
                            </table>
                            <h4 style="text-align: center;">Peer Group: DE</h4>
                            <table border="1" bordercolor="black" cellpadding="0" cellspacing="0"
                                style="font-family:Calibri; font-size:20px; width:100%;">
                                <tr style="background-color: #D3D3D3;">
                                    <td colspan="8" style="border:1px solid black;vertical-align:text-top;padding:1px">
                                        Overall Satisfaction with Parts
                                        Department </td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">Dealer
                                    </td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">Peer
                                        Group
                                    </td>
                                </tr>
                                <tr style="background-color: #FFFFFF;">
                                    <td colspan="8" style="border:1px solid black;vertical-align:text-top;padding:1px">Current
                                        Quater</td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">96.2</td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">93.1</td>
                                </tr>
                                <tr style="background-color: #FFFFFF;">
                                    <td colspan="8" style="border:1px solid black;vertical-align:text-top;padding:1px">Rolling
                                        month
                                    </td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">96.4</td>
                                    <td colspan="2" style="border:1px solid black;vertical-align:text-top;padding:1px">94.3</td>
                                </tr>
                            </table>
                            <div id="myPlot"></div>
                        </div>
                        <div style="width:100%" id="myPlot1"></div>
                    </div>
                </div>
        
                <div id="myPlot1"></div>
                <script>
                    var trace1 = {
                        x: ['Q3-19', 'Q4-19', 'Q1-20', 'Q2-20', 'Q3-20', 'Q4-20'],
                        y: [10, 20, 30, 20, 20, 20],
                        mode: 'lines',
                        name: 'Dealer',
                        line: {
                            color: 'red'
                        }
        
                    }
                    var trace2 = {
                        x: ['Q3-19', 'Q4-19', 'Q1-20', 'Q2-20', 'Q3-20', 'Q4-20'],
                        y: [20, 20, 20, 10, 10, 10],
                        mode: 'lines',
                        name: 'Peer',
                        line: {
                            dash: 'dashdot',
                            width: 4,
                            color: 'blue',
                        }
        
                    }
                    var data = [trace1, trace2];
                    var layout = {
                        autosize: false,
                        width: 500,
                        height: 300,
                        xaxis: {
                            type: 'category',
                            range: [-1, 6]
                        },
                        yaxis: { range: [0, 30] },
                        title: {
                            text: "Rolling 12 Month Response Rate",
                            font: {
                                size: 12
                            }
                        },
                        legend: {
                            x: 0.2,
                            y: 4,
                            "orientation": "h"
                        }
                    };
                    Plotly.newPlot("myPlot1", data, layout, { displayModeBar: false })
                </script>
                <script>
                    var trace1 = {
                        x: ['Q3-19', 'Q4-19', 'Q1-20', 'Q2-20', 'Q3-20', 'Q4-20'],
                        y: [10, 20, 30, 20, 20, 20],
                        mode: 'lines',
                        name: 'Dealer',
                        line: {
                            color: 'red'
                        }
        
                    }
                    var trace2 = {
                        x: ['Q3-19', 'Q4-19', 'Q1-20', 'Q2-20', 'Q3-20', 'Q4-20'],
                        y: [20, 20, 20, 10, 10, 10],
                        mode: 'lines',
                        name: 'Peer',
                        line: {
                            dash: 'dashdot',
                            width: 4,
                            color: 'blue',
                        }
        
                    }
                    var data = [trace1, trace2];
                    var layout = {
                        autosize: false,
                        width: 500,
                        height: 300,
                        legend: {
                            x: 0.2,
                            y: 4,
                            "orientation": "h"
                        },
                        xaxis: {
                            type: 'category',
                            range: [-1, 6]
                        },
                        yaxis: { range: [0, 30] },
                        // title: "Rolling 12 Month Response Rate"
                        title: {
                            text: 'Rolling 12 Month Response Rate',
                            font: {
                                size: 12
                            }
                        }
                    };
                    Plotly.newPlot("myPlot", data, layout, { displayModeBar: false })
                </script>
        
            </div>
        </body>
        
        </html>`};

    const result = html_to_pdf.generatePdf(file, options).then(res => res);
    return result
}
let mailOptions = {
    from: 'udemyclone2021@gmail.com',
    to: 'letrandong1199@gmail.com',
    subject: 'Satisfyd Report',
}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "udemyclone2021@gmail.com", // generated ethereal user
        pass: "snioutkkgapvjtzd", // generated ethereal password
    },
})
const sendEmail = async () => {
    const FILE_CONTENT = await generatePdf()

    mailOptions = {
        ...mailOptions, attachments: [{
            filename: 'filename.pdf',
            content: new Buffer.from(FILE_CONTENT, 'base64'),
            contentType: 'application/pdf'
        }],
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    })
}



cron.schedule('*/5 * * * * *', () => {
    console.log('Tasked scheduled with every 5 seconds: ', (new Date()).getSeconds())
    sendEmail()
});

app.listen(9000);