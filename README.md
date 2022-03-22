<h1 align="center">
  techno-cv
  </h1>
 <p align="center">
  <i>Sam Castle, Ted Kane, Jack Polturak</i> <br/>
  <sub>Dyson School of Design Engineering | Imperial College London | Audio Experience Design</sub>
</p>
<br/><br/>
<p align="center">
Techno-cv is an interactive audio installation whereby a minimal techno track can be built-up and manipulated using just gestures. Displayed on a visual interface, samples can be selected and moulded, effects applied, and a sample synthesiser played, simply by moving one’s arms in space. The positions of your hands are tracked, using an opensource computer vision system, and used to trigger buttons on the interface. These buttons in turn manipulate the parameters of a custom Max 8 patch in which samples are layered and filters applied to create a versatile minimal techno. A video of the installation can be found here.
  </p>

 <p align="center">
  <i>N.B. Whilst this report outlines the project as a whole, there is a focus on the work I personally contributed.</i>
  </p>
  
## Gallery


## Contents

<details>
  <summary>Aims of the Work</summary>
  
  ## Aims of the Work
  Techno-cv is an interactive audio installation whereby a minimal techno track can be built-up and manipulated using just gestures. Displayed on a visual interface, samples can be selected and moulded, effects applied, and a sample synthesiser played, simply by moving one’s arms in space. The positions of your limbs are tracked using an opensource computer vision system, with the positions of your hands used to trigger buttons on the interface. These buttons in turn manipulate the parameters of a custom Max 8 patch in which samples are layered and filters applied to create a versatile minimal techno.
</details>

<details>
  <summary>Installation Architecture</summary>
  
  ## Installation Architecture
  Techno-cv is an interactive audio installation whereby a minimal techno track can be built-up and manipulated using just gestures. Displayed on a visual interface, samples can be selected and moulded, effects applied, and a sample synthesiser played, simply by moving one’s arms in space. The positions of your limbs are tracked using an opensource computer vision system, with the positions of your hands used to trigger buttons on the interface. These buttons in turn manipulate the parameters of a custom Max 8 patch in which samples are layered and filters applied to create a versatile minimal techno.
</details>

<details>
  <summary>Max Patch Overview</summary>
  
  ## Max Patch Overview
As I had prior experience working in Max 8, I created the audio control patch to take in the gesture inputs and build a track from them. The core functionality of the patch is based on a three-track looper which allows you to build up a simple techno track from a predefined set of samples and manipulate parameters such as tempo and volume. In addition, the patch allows you to apply effect filters, high- and lowpass, distorting the sound as DJs often do on their decks. Finally, the patch allows you to play a sample up and down a scale, perfectly in time, over the loop with a synchronised sample synthesiser.
  
Therefore, we can split the functionality of the patch down into four main stages: selecting the samples, looping the samples (and controlling their gain and tempo), applying high and lowpass filters, and playing the sample synth on the predefined scale.
  
<i>The patch can be controlled with the gesture inputs via the computer vision system or via the Max interface and key presses on the computer keyboard.</i>

</details>

<details>
  <summary>Selecting Samples</summary>
  
  ## Selecting Samples
  ### Choosing Coherent Samples
The track is split into three stems: the drumbeat, the bassline, and a melodic line to create polyphony with the bass. For each stem there is a choice of three different samples from which the track can be built, and additionally a stem may be silenced completely. With at least one stem playing there are 63 (4<sup>3</sup> -1) discreet possibilities for the composition, however since each stem’s sample can be switched multiple times mid track, the options are actually fairly extensive. In addition to the looping samples, an appropriate synthesiser sample, for the sample synth element also had to be chosen.
  
The samples were downloaded from the free sample library at BandLab. A great deal of care was taken in picking samples that would sound consonant in all configurations and create a sound appropriate of the genre. The samples themselves were all converted to the same key (C minor) and tempo (126 bpm) before being loaded into the patch. I did this originally using Audacity, applying pitch shift and tempo effects, later realising it could be done directly on the BandLab website before download!

   ### Switching Between Samples
  With the samples chosen, they were loaded into the Max patch. This was achieved using four buffers (**buffer~**), one for each stem and one for the sample synth. Using **radiogroups** a new sample can be loaded into the buffer by clicking on the corresponding dot. Inside the subpatchers **drumsamples**, **basssamples**, and **melodicsamples**, replace messages, calling .wav files from the computer, are sent to the buffer with the **select** function. The new sample carries on playing from the same point in the buffer allowing the track to remain synchronised.
  
To control the sample switches using the computer vision inputs, the patch needed a way to take in that data. The **udpreceive** function (port 8080) takes in streams of OSC data from Javascript, via the Node server, for each stem and channels them into the **receivedata** subpatcher. For each variable the choice of sample (1, 2 or 3) is sent into an **int** function stores the selection until a beat from the metronome is sent through. Since the data input is a continuous stream, the **change** function is used to only identify when the selection has changed.

</details>


<details>
  <summary>The Looper</summary>
  
  ## The Looper
The looping function is built around the **groove~** function in Max. This function accesses the buffer to which it is assigned and allows it to be looped. It also allows various parameters to be controlled, with values brought in with **udpreceive** from the Node server. Tempo is controlled by changing the speed of the signal running into **groove~**. The Time Stretch function has been used to stop the samples from changing pitch when the tempo is increased. The volume of the track is controlled by simply scaling a slider to appropriate dB values (-70 to +6) and using the output to drive the master gain. The gain of each stem can be controlled within the patch, to mix the track, however this has been pre-mixed to appropriate values for a good balance.
  
To start building a track each stem loop must be initiated, by selecting ‘Track ON/OFF’. This starts the stems synchronously and silently until the sound for each is turned ion. Technically, the ‘turning on/off’ of the stems is achieved by setting the amplitude of signal to 0, if toggled off, and 1, if toggled on. The ‘Loop’, ‘Sync’, ‘Time Stretch’ and ‘Speakers’ toggles all also must be turned on at the programs start. Since some of the samples are different lengths, the Loop Sync output of **groove~** is used to start the other loops from the beginning whenever the drumbeat reaches the start of the sample. 

</details>


<details>
  <summary>Filtering Effects</summary>
  
  ## Filtering Effects
Lowpass and highpass filtering can be added to the track similarly to the tempo and volume. Using an **if else** function, the upper half of the slider controls the highpass filter and the lower half controls the lowpass filter. Inside the **lowpass_highpass** subpatch, the **filtergraph~** function is used to select the filter shapes, and the slider value (scaled), is used to drive the cut off frequency and gain. With the filter shape defined, the **biquad~** function is used to implement the filter to both audio channels, applying the distinctive sound effect incorporated in most DJ decks. Filtering can be used to hide the transitions between loops to create a seamless audio experience.

</details>

<details>
  <summary>Sample Synthesiser</summary>
  
  ## Sample Synthesiser
The most complex part of the patch is the sample synthesiser. It can be split into three functions: the control of a MIDI keyboard, syncing the notes to the track and using the keyboard to play the sample at different pitches.
  
  ### MIDI Keyboard
The keyboard is played by holding your hand over the desired key on screen. When a key is selected its number is sent through a selector sends out the corresponding MIDI value for the note. The MIDI values here make up the C harmonic minor scale. Next this MIDI value has a defined multiple of 12 added, to shift the note up or down the octave. It is then packaged up with a key velocity value given by the global volume control and sent out as a MIDI message with the **midiformat** function. The note is released in a similar way: a message for the key release is sent through, this time with a key velocity of 0. This cuts the played note off.  

  ### Syncing the Keyboard
The keyboard has been configured to only play in time with the music. This was achieved by syncing it to the main looper with a metronome at the tempo dictated by the tempo slider in ms. The metronome sends out a bang every two beats, but this is only allowed through the **gate** into the **simplekeyboardv2** bpatcher when the computer vision recognises the hand over a key. This means the keyboard will play in time and only when a key is selected. The metronome also sends a delayed bang on the offbeat which triggers the key to be released inside the keyboard bpatcher. 
  
   ### Playing a Sample
With the keyboard playing in time, it can be used to control and manipulate our synth sample. This is done in a custom function I built, called **SampleSynthv2**. The **notein** function receives our MIDI note-on and note-off messages from the keyboard and sends them into **SampleSynthv2**. Inside the MIDI messages are unpacked into note number and key velocity (i.e. volume). If the volume is non-zero, indicating a key has been selected, a message to start playing the sample loaded in the synth buffer is sent out. The volume is also scaled to decibels and used to control the live gain of the sample.
  
The MIDI note number is converted to frequency (**mtof**), and then divided by the frequency of C4. This creates a scaling factor with which the sample can be pitch shifted, to play the sample at the pitch of the note played. The playback speed of the sample is also defined by the main tempo slider for the patch, with **Timestretch** again being applied to ensure any change to the tempo will not affect the pitch of the sample.

  
</details>




<details>
  <summary>Review and Future Work</summary>
  
  ## Future Work and Improvements
  Techno-cv is an interactive audio installation whereby a minimal techno track can be built-up and manipulated using just gestures. Displayed on a visual interface, samples can be selected and moulded, effects applied, and a sample synthesiser played, simply by moving one’s arms in space. The positions of your limbs are tracked using an opensource computer vision system, with the positions of your hands used to trigger buttons on the interface. These buttons in turn manipulate the parameters of a custom Max 8 patch in which samples are layered and filters applied to create a versatile minimal techno.
</details>


<p align="center">
    <img width="600" src="images/pm.PNG">
</p>

<p align="center">
  <i>Max Patch in presentation mode</i>
</p>



- [ ] Add delight to the experience when all tasks are complete
