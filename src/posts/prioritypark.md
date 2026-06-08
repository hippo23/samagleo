---
title: 'PriorityPark: An IoT Cup Project'
summary: 'From May 19, a team of comprising of me and four other classmates were tasked with creating a project using MOSIP authentication. We ended up creating a physical parking barrier for PWDs, which ended up winning 3rd place.'
thumbnail: /images/sqrt2.jpg
date: 2026-05-20
---
# PriorityPark: An IoT Cup Project

For our capstone project in CS145 (Computer Networks), we were tasked to create some kind of solution that leverages *modular open-source identity platform* (MOSIP) to solve any problem of our choosing.

## Rationale

After circling around a number of ideas, our group settled on creating a barrier that links the national ID of a Filipino Citizen to their status as a PWD, and uses that information to allow or deny somoene parking in PWD parking spaces within public establishments (which are required to exist by law).

## The Steps

I, for one, was involved mostly on the software side. The moving parts were as follows:  


  * Database: Cloudflare D1
  * Server: AWS EC2, FastAPI
  * Networking Tools: Wireguard


Using these tools, we were able to create the following flow:

  1. User scans QR code and the ESP32 validates that the format is as expected.
  2. Data is sent to server.
  3. Server verifies that the person is both a Filipino Citizen and a registered PWD by checking the MOSIP testbed (hosted by our department) and the Cloudflare D1 database respectively.
  4. It sends a denied or approved response back to the ESP32 depending on the previous criteria.
  5. The barrier then lowers or stays accordingly.

## Results

In the end, we were able to create a usable, modular prototype that can easily be put into any parking lot within a few minutes (provided there are outlets). It ended up winning 3rd place in the IoT Cup held in our department (see evidence below).

<br />

<iframe
  src="https://drive.google.com/file/d/1OUL-S4zN-Hkyr_I7vV112aC-cW1KRNkc/preview"
  width="100%"
  height="480"
  allow="autoplay"
/>
