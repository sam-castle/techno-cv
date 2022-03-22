
const video5 = document.getElementsByClassName('input_video5')[0];
const out5 = document.getElementsByClassName('output5')[0];
const controlsElement5 = document.getElementsByClassName('control5')[0];
const canvasCtx5 = out5.getContext('2d');
var osc = new OSC();
osc.open();

var canvasHandleft = document.getElementById("handPosleft");
var ctxleft = canvasHandleft.getContext("2d");

var canvasHandright = document.getElementById("handPosright");
var ctxright = canvasHandright.getContext("2d");


           

// filter variables
var fval = 0;
var tval = 126;
var vval = 0;
//sampler variables. D= drums b=bass m=melody/melodic o= off
//drums

var dval = 0;
var mval = 0;
var bval = 0;
const bmin = document.getElementById("bmin");
const bmax = document.getElementById("bmax");
const bnum = document.getElementById("bnum");
const dmin = document.getElementById("dmin");
const dmax = document.getElementById("dmax");
const dnum = document.getElementById("dnum");
const mmin = document.getElementById("mmin");
const mmax = document.getElementById("mmax");
const mnum = document.getElementById("mnum");

const fpsControl = new FPS();

const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
  spinner.style.display = 'none';
};

function zColor(data) {
  const z = clamp(data.from.z + 0.5, 0, 1);
  return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
}

function onResultsPose(results) {
  document.body.classList.add('loaded');
  fpsControl.tick();

  canvasCtx5.save();
  canvasCtx5.clearRect(0, 0, out5.width, out5.height);
  canvasCtx5.drawImage(
      results.image, 0, 0, out5.width, out5.height);
  drawConnectors(
      canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
        color: (data) => {
          const x0 = out5.width * data.from.x;
          const y0 = out5.height * data.from.y;
          const x1 = out5.width * data.to.x;
          const y1 = out5.height * data.to.y;

          const z0 = clamp(data.from.z + 0.5, 0, 1);
          const z1 = clamp(data.to.z + 0.5, 0, 1);

          const gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
          gradient.addColorStop(
              0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
          gradient.addColorStop(
              1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
          return gradient;
        }
      });
  drawLandmarks(
      canvasCtx5,
      Object.values(POSE_LANDMARKS_LEFT)
          .map(index => results.poseLandmarks[19]),
      {color: zColor, fillColor: '#FF0000'});
  drawLandmarks(
      canvasCtx5,
      Object.values(POSE_LANDMARKS_RIGHT)
          .map(index => results.poseLandmarks[20]),
      {color: zColor, fillColor: '#00FF00'});
      const xhand = document.getElementById("xhand");
      xhand.innerHTML = results.poseLandmarks[15];
      //console.log("x=" + results.poseLandmarks[19].x);
      //console.log("y=" + results.poseLandmarks[19].y);
      let x1 = results.poseLandmarks[19].x;
      let x2 = results.poseLandmarks[20].x;
      let y1 = results.poseLandmarks[19].y;
      let y2 = results.poseLandmarks[20].y;
      
      let x1hand = x1*1000;
      let y1hand = y1*1000;
      let x2hand = x2*1000;
      let y2hand = y2*1000;
      /*ctxleft.beginPath();
      ctxleft.arc(x1hand, y1hand, 15, 0, 2 * Math.PI);
      ctxleft.fillStyle = 'rgba(204, 102, 255, 0.6)';
      ctxleft.fill();      
  

      ctxright.beginPath();
      ctxright.arc(x2hand, y2hand, 15, 0, 2 * Math.PI);
      ctxright.fillStyle = 'rgba(255, 102, 153, 0.6)';
      ctxright.fill();

      ctxleft.clearRect(0, 0, canvasHandleft.width, canvasHandleft.height);
      ctxright.clearRect(0, 0, canvasHandright.width, ctxright.height);

      */

      
      



      // CONTROLLING KEYBOARD
      var Do = 1;
      console.log("this is" +dval)

      
    if (y1<0 || y1>0.25 ){
      //console.log(y1);
      var message = new OSC.Message('/Keys', 0);
      osc.send(message) 
    }
    
      if (y1<0.25 && y1>0){
        bmin.classList.replace('on','off');
        bmax.classList.replace('on','off');
        dmin.classList.replace('on','off');
        dmax.classList.replace('on','off');
        mmin.classList.replace('on','off');
        mmax.classList.replace('on','off'); 
        if (x1<0.07) {
          console.log("c");
          A.classList.replace('on','off');
          B.classList.replace('on','off');
          C.classList.replace('off','on');
          D.classList.replace('on','off');
          E.classList.replace('on','off');
          F.classList.replace('on','off');
          G.classList.replace('on','off');
          var message = new OSC.Message('/Keys', 97);
          osc.send(message) 

        
        } else if (x1<0.24) {
          A.classList.replace('on','off');
          B.classList.replace('on','off');
          C.classList.replace('on','off');
          D.classList.replace('off','on');
          E.classList.replace('on','off');
          F.classList.replace('on','off');
          G.classList.replace('on','off');
          console.log("d");
          var message = new OSC.Message('/Keys', 115);
          osc.send(message) 
        } else if (x1<0.35) {
          A.classList.replace('on','off');
          B.classList.replace('on','off');
          C.classList.replace('on','off');
          D.classList.replace('on','off');
        E.classList.replace('off','on');
        F.classList.replace('on','off');
        G.classList.replace('on','off');
        console.log("e");
        var message = new OSC.Message('/Keys', 100);
          osc.send(message) 
      } else if (x1<0.47) {
        A.classList.replace('on','off');
        B.classList.replace('on','off');
        C.classList.replace('on','off');
        D.classList.replace('on','off');
        E.classList.replace('on','off');
        F.classList.replace('off','on');
        G.classList.replace('on','off');
        var message = new OSC.Message('/Keys', 102);
          osc.send(message) 
     
        console.log("f");
      } else if (x1<0.65) {
        A.classList.replace('on','off');
        B.classList.replace('on','off');
        C.classList.replace('on','off');
        D.classList.replace('on','off');
        E.classList.replace('on','off');
        F.classList.replace('on','off');
        G.classList.replace('off','on');
        var message = new OSC.Message('/Keys', 103);
          osc.send(message) 

     
        console.log("g");
     } else if (x1<0.8) {
        A.classList.replace('off','on');
        B.classList.replace('on','off');
        C.classList.replace('on','off');
        D.classList.replace('on','off');
        E.classList.replace('on','off');
        F.classList.replace('on','off');
        G.classList.replace('on','off');
        var message = new OSC.Message('/Keys', 104);
          osc.send(message) 

       
        console.log("a");
        
      } else if (x1<0.95){
        A.classList.replace('on','off');
        B.classList.replace('off','on');
        C.classList.replace('on','off');
        D.classList.replace('on','off');
        E.classList.replace('on','off');
        F.classList.replace('on','off');
        G.classList.replace('on','off');
        var message = new OSC.Message('/Keys', 107);
          osc.send(message) 

      
        console.log("b");
      } 
    }
    // ****KEYBOARD END******



    //controlling the sample pad
    if (x1>0.67 && x1<1 && y1>0.3 && y1<1) {
      
      A.classList.replace('on','off');
      B.classList.replace('on','off');
      C.classList.replace('on','off');
      D.classList.replace('on','off');
      E.classList.replace('on','off');
      F.classList.replace('on','off');
      G.classList.replace('on','off');
      console.log("piano off")
      
      //assign the variables relating to the different control parts
      console.log("sampler")
       
  if (y1>0.67 && y1<0.75) {
        console.log("bass min");
        bmin.classList.replace('off','on');
        bmax.classList.replace('on','off');
        dmin.classList.replace('on','off');
        dmax.classList.replace('on','off');
        mmin.classList.replace('on','off');
        mmax.classList.replace('on','off');        
        bval = bval - 0.85;
        if (bval<0){
          bval = 0
        }
        console.log(bval)

    } else if (y1>0.56 && y1<0.64) {
      console.log("bass high");
      bmin.classList.replace('on','off');
      bmax.classList.replace('off','on');
      dmin.classList.replace('on','off');
      dmax.classList.replace('on','off');
      mmin.classList.replace('on','off');
      mmax.classList.replace('on','off');      
      bval = bval + 0.85;
      if (bval>60){
        bval = 60
      }
      console.log(bval)
      

  }
  else if (y1>0.42 && y1<0.49) {
    console.log("drums low");
    bmin.classList.replace('on','off');
    bmax.classList.replace('on','off');
    dmin.classList.replace('off','on');
    dmax.classList.replace('on','off');
    mmin.classList.replace('on','off');
    mmax.classList.replace('on','off');
    if (dval<0){
      dval = 0
    }
    
    dval = dval - 0.85;
    console.log(dval)

}
else if (y1>0.32 && y1<0.39) {
  console.log("drums high");
  bmin.classList.replace('on','off');
  bmax.classList.replace('on','off');
  dmin.classList.replace('on','off');
  dmax.classList.replace('off','on');
  mmin.classList.replace('on','off');
  mmax.classList.replace('on','off');
  if (dval>60){
    dval = 60

  }
  
  dval = dval + 0.85;
  //HERE!!!!
  
  dnum.innerHTML = dval;
  console.log(dval)

}
else if  (y1>0.87 && y1<0.98){
  console.log("melody low");
  bmin.classList.replace('on','off');
  bmax.classList.replace('on','off');
  dmin.classList.replace('on','off');
  dmax.classList.replace('on','off');
  mmin.classList.replace('off','on');
  mmax.classList.replace('on','off');
  if (mval<-0){
    mval = -0
  }  
  mval = mval - 0.85;
  mnum.innerHTML = mval;
  console.log(mval)

}
else if (y1>0.78 && y1<0.85) {
console.log("melody high");
bmin.classList.replace('on','off');
bmax.classList.replace('on','off');
dmin.classList.replace('on','off');
dmax.classList.replace('on','off');
mmin.classList.replace('on','off');
mmax.classList.replace('off','on');
if (mval>60){
  mval = 60
} 
mval = mval + 0.85;
mnum.innerHTML = mval;
console.log(mval)

}
      
    } else{
        bmin.classList.replace('on','off');
        bmax.classList.replace('on','off');
        dmin.classList.replace('on','off');
        dmax.classList.replace('on','off');
        mmin.classList.replace('on','off');
        mmax.classList.replace('off','off');   
    }

if (dval < 15){
  dnum.innerHTML = "off";
  var message = new OSC.Message('/Drum/Toggle', 0);
  osc.send(message);
      
    } else if (dval<30){
      console.log("hello" + dval)
      dnum.innerHTML = "1";
      var message = new OSC.Message('/Drums',0);
      osc.send(message);
      var message = new OSC.Message('/Drum/Toggle',1);
      console.log("this is the thing we want" + message)
      osc.send(message);

      
    } else if (dval<45){
      console.log("hello" + dval)
      dnum.innerHTML = "2";
      var message = new OSC.Message('/Drums',1);
      osc.send(message);
      var message = new OSC.Message('/Drum/Toggle',1);
      osc.send(message);

    } else if (dval>45){
      console.log("hello" + dval)
      dnum.innerHTML = "3";
      var message = new OSC.Message('/Drums',2);
      osc.send(message);
      var message = new OSC.Message('/Drum/Toggle',1);
      osc.send(message);
    }

    if (bval < 15){
      console.log("hello" + bval)
      bnum.innerHTML = "off";
      var message = new OSC.Message('/Bass/Toggle',0);
      osc.send(message);
          
        } else if (bval<30){
          console.log("hello" + bval)
          bnum.innerHTML = "1";
          var message = new OSC.Message('/Bass',0);
          osc.send(message);
          var message = new OSC.Message('/Bass/Toggle',1);
          osc.send(message);
          
        } else if (bval<45){
          console.log("hello" + bval)
          bnum.innerHTML = "2";
          var message = new OSC.Message('/Bass',1);
          osc.send(message);
          var message = new OSC.Message('/Bass/Toggle',1);
          osc.send(message);
          

        } else if (bval>45){
          console.log("hello" + bval)
          bnum.innerHTML = "3";
          var message = new OSC.Message('/Bass',2);
          osc.send(message);
          var message = new OSC.Message('/Bass/Toggle',1);
          osc.send(message);
        }
  if (mval < 15){
          console.log("hello" + mval)
          mnum.innerHTML = "off";
          var message = new OSC.Message('/Melody/Toggle',0);
          osc.send(message);
              
            } else if (mval<30){
              console.log("hello" + mval)
              mnum.innerHTML = "1";
              var message = new OSC.Message('/Melody',0);
              osc.send(message);
              var message = new OSC.Message('/Melody/Toggle',1);
              osc.send(message);

            } else if (mval<45){
              console.log("hello" + mval)
              mnum.innerHTML = "2";
              var message = new OSC.Message('/Melody',1);
              osc.send(message);
              var message = new OSC.Message('/Melody/Toggle',1);
              osc.send(message);

            } else if (mval>45){
              console.log("hello" + mval)
              mnum.innerHTML = "3";
              var message = new OSC.Message('/Melody',2);
              osc.send(message);
              var message = new OSC.Message('/Melody/Toggle',1);
              osc.send(message);
            }




    //controlling the fx
   if (x2>0 && x2<0.3 && y2>0.3 && y2<1) {
      const fmin = document.getElementById("fmin");
      const fmax = document.getElementById("fmax");
      const fnum = document.getElementById("fnum");
      const vmin = document.getElementById("vmin");
      const vmax = document.getElementById("vmax");
      const vnum = document.getElementById("vnum");
      const tmin = document.getElementById("tmin");
      const tmax = document.getElementById("tmax");
      const tnum = document.getElementById("tnum");
      console.log("filter")
      

    if (y2>0.67 && y2<0.75) {
        fmin.classList.replace('off','on');
        fmax.classList.replace('on','off');
        vmin.classList.replace('on','off');
        vmax.classList.replace('on','off');
        tmin.classList.replace('on','off');
        tmax.classList.replace('on','off');
        var message = new OSC.Message('/Frequency',fval/50);
        osc.send(message)
        if (fval<-49){
          fval = -49
          console.log("adjusted "+fval)
        }
        
        fval = fval - 1;
        fnum.innerHTML = fval;
        console.log(fval)

    } else if (y2>0.56 && y2<0.64){
      fmin.classList.replace('on','off');
      fmax.classList.replace('off','on');
      vmin.classList.replace('on','off');
      vmax.classList.replace('on','off');
      tmin.classList.replace('on','off');
      tmax.classList.replace('on','off');
      var message = new OSC.Message('/Frequency',fval/50);
        osc.send(message)
      if (fval>49){
        fval = 49
        console.log("adjusted "+fval)
      }
      fval = fval + 1;
      fnum.innerHTML = fval;
      console.log(fval)

  }
  else if (y2>0.87 && y2<0.98) {
    fmin.classList.replace('on','off');
    fmax.classList.replace('on','off');
    vmin.classList.replace('off','on');
    vmax.classList.replace('on','off');
    tmin.classList.replace('on','off');
    tmax.classList.replace('on','off');
    var message = new OSC.Message('/Volume',vval);
        osc.send(message)
    
    vval = vval - 1;
    vnum.innerHTML = vval;
    console.log(vval)
    if (vval<-70){
      vval = -70
      console.log("adjusted "+vval)
    }

}
else if  (y2>0.78 && y2<0.85){
  fmin.classList.replace('on','off');
  fmax.classList.replace('on','off');
  vmin.classList.replace('on','off');
  vmax.classList.replace('off','on');
  tmin.classList.replace('on','off');
  tmax.classList.replace('on','off');
  var message = new OSC.Message('/Volume',vval);
        osc.send(message)
    
  
  vval = vval + 1;
  vnum.innerHTML = vval;
  console.log(vval)
  if (vval>6){
    vval = 6
    console.log('/Volume' +vval)
  }

}
else if (y2>0.42 && y2<0.49){
  fmin.classList.replace('on','off');
  fmax.classList.replace('on','off');
  vmin.classList.replace('on','off');
  vmax.classList.replace('on','off');
  tmin.classList.replace('off','on');
  tmax.classList.replace('on','off');
  var message = new OSC.Message('/Tempo',tval);
  osc.send(message)
  tval = tval - 1;
  tnum.innerHTML = tval; 

  tnum.innerHTML = tval;
  console.log(tval)
  if (tval< 86){
    tval = 86
    console.log('/Tempo'+tval)
  }

}
else if (y2>0.32 && y2<0.39) {
console.log("c");
fmin.classList.replace('on','off');
fmax.classList.replace('on','off');
vmin.classList.replace('on','off');
vmax.classList.replace('on','off');
tmin.classList.replace('on','off');
tmax.classList.replace('off','on');
var message = new OSC.Message('/Tempo',tval);
osc.send(message)

tval = tval + 1;
tnum.innerHTML = tval;
console.log(tval)
if (tval> 166){
  tval = 166
  console.log('/Tempo'+tval)
}

}

} else {
    const fmin = document.getElementById("fmin");
      const fmax = document.getElementById("fmax");
      const fnum = document.getElementById("fnum");
      const vmin = document.getElementById("vmin");
      const vmax = document.getElementById("vmax");
      const vnum = document.getElementById("vnum");
      const tmin = document.getElementById("tmin");
      const tmax = document.getElementById("tmax");
      const tnum = document.getElementById("tnum");
    fmin.classList.replace('on','off');
    fmax.classList.replace('on','off');
    vmin.classList.replace('on','off');
    vmax.classList.replace('on','off');
    tmin.classList.replace('on','off');
    tmax.classList.replace('on','off');
  }
  

  drawLandmarks(
      canvasCtx5,
      Object.values(POSE_LANDMARKS_NEUTRAL)
          .map(index => results.poseLandmarks[index]),
      {color: zColor, fillColor: '#AAAAAA'});
  canvasCtx5.restore();
 
      
  
  
}

const pose = new Pose({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`;
}});
pose.onResults(onResultsPose);

const camera = new Camera(video5, {
  onFrame: async () => {
    await pose.send({image: video5});
  },
  width: 800,
  height: 800
});
camera.start();





new ControlPanel(controlsElement5, {
      selfieMode: true,
      upperBodyOnly: false,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })
    .add([
      new StaticText({title: 'MediaPipe Pose'}),
      fpsControl,
      new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
      new Toggle({title: 'Upper-body Only', field: 'upperBodyOnly'}),
      new Toggle({title: 'Smooth Landmarks', field: 'smoothLandmarks'}),
      new Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
      }),
      new Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
      }),
    ])
    .on(options => {
      video5.classList.toggle('selfie', options.selfieMode);
      pose.setOptions(options);
    });