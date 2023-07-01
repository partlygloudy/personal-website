# Making sense of... pulsars and gravity waves
#### June 29, 2023 @ 3:00 PM

*Disclaimer: 'Making sense of...' posts are ones where I try to explain something in an understandable way in order to better understand it myself. Do not blindly accept this as definitive or factual! That said, I have tried to make this a good, accurate explanation (that's the whole point). If you notice any errors, please let me know!*

We now have a completely new way to detect gravitational waves! We used to only have one way, and that way is mainly good at detecting really weird gravitational waves. Now we have two ways!

## LIGO (the old way)

In 2015, a device called LIGO ('i' for interferometer) detected a gravitational wave for the first time. An interferometer works by:

1. Generating a beam of ‘coherent’ light (all the photons are the same frequency and in phase - think of it as a pure sine wave)
2. Splitting the wave into two perpendicular beams using a partially reflecting mirror
3. Letting each beam travel a long, fixed distance
4. Recombining the beams
5. Measuring the intensity of the resulting beam

The optics are configured so when the beams are recombined, their phase is shifted by 180 degrees, meaning they are perfectly out of phase. The waves cancel each other out, so a light detector watching the resulting beam shouldn’t detect any light.

If any disturbance alters the distance traveled by one of the beams ever so slightly, the phase difference between the waves won’t be exactly 180 degrees when they recombine, and a bit of light will reach the sensor.

Gravitational waves stretch and compress space as they propagate. If one passes the interferometer, it alters the relative distances traveled by the beams, slightly lengthening one and shortening the other. As the wave is passing, photons leaving the emitter at the same time will travel slightly different distances before recombining, moving the beams slightly into phase and causing a tiny signal of light to reach the sensor.

## LIGO detects really weird gravitational waves

The wave detected by LIGO ranged in frequency from roughly 35 Hz to 250 Hz. Take a moment to appreciate what that actually means, physically. Black holes, each 30 times the mass of the sun oscillating around each other 250 times per second! Whoah!

This is very cool, but also points at a limitation of LIGO - it’s fairly limited in the type of gravitational waves it can detect - sort of like a telescope that can only detect extremely high energy gamma rays. LIGO captured the final, frenzied blip of activity at the moment a pair of black holes merged.


<figure>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/LIGO_measurement_of_gravitational_waves.svg/1280px-LIGO_measurement_of_gravitational_waves.svg.png"
         alt="First observation of gravitational waves by LIGO (signal GW150914). Shows the gravitational wave signals received by the LIGO instruments at Hanford, Washington (left) and Livingston, Louisiana (right) and comparisons of these signals to the signals expected due to a black hole merger event.">
    <figcaption>every oscillation on this graph is caused by two black holes, each 30 times as massive as the sun, orbiting each other. The whole graph is 0.45 seconds. [image from Wikipedia]</figcaption>
</figure>

Astronomers think there are tons of multiple-black hole systems scattered about the universe, including some extraordinarily massive ones (*millions* or *billions* of solar masses). If so, all these orbiting supermassive black holes should be filling the universe with a cacophony of gravitational waves, a sort of “gravitational background noise”.

But most of these systems have sane orbital periods on the order of months or years. If a system takes 10 years to complete an orbit, this means the resulting gravitational wave will have a wavelength of *10 light years*. Meaning it will take 10 years from the time the wave first reaches earth to the time a single cycle of the wave has finished.

Well, now we have a way to detect this totally different class of gravitational wave…

## Pulsars (the new way)

Neutron stars are some of the craziest objects in the universe. Among other weird properties, they have extremely strong magnetic fields and shoot really really bright beams of light from their poles. They also rotate extremely fast, on the order of milliseconds to seconds per rotation.

When they’re young enough that their beam is still bright and it happens to point towards earth during part of its rotation, we call them pulsars, because they appear to pulse regularly in the sky as the beam comes in and out of view.

<div class="youtube-video-outer">
    <div class="youtube-video-wrapper">
        <iframe class="youtube-video" src="https://www.youtube.com/embed/udFxKZRyQt4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
</div>

Pulsar pulses are extremely consistent - the interval between pulses is so consistent they rival atomic clocks in their regularity. This is why we can use them to detect gravitational waves.

Gravitational waves stretch and compress the space between the earth and the pulsars we can see from earth. Pulses emitted while the space was compressed should reach earth slightly ahead of schedule, while pulses emitted while space is stretched should arrive slightly late. If we plot the earliness / lateness of the pulses, we’re really plotting the stretching and compression of the space between the earth and the pulsar… we’re plotting gravitational waves!

Over the last 15 years, astronomers have developed several “pulsar timing arrays” - taking regular measurements of the precise pulse timing of a set of ‘millisecond pulsars’. Now, the measurement precision and data analysis techniques have advanced to the point that they can tease out signals from the noise. And we can confidently say that the signal is showing gravitational waves, and that those waves match the ‘gravitational background noise’ that scientists had theorized. Neat!

## More good stuff on this topic:

- [Nature Article](https://www.nature.com/articles/d41586-023-02167-7)
- [Hank Green explainer](https://twitter.com/hankgreen/status/1673752025975394305)
- [Cosmic Strings](https://en.wikipedia.org/wiki/Cosmic_string) (if they exist) would theoretically emit detectable gravitational waves. However they seem kind of complicated:
 >Cosmic strings are hypothetical 1-dimensional topological defects which may have formed during a symmetry-breaking phase transition in the early universe when the topology of the vacuum manifold associated to this symmetry breaking was not simply connected.

