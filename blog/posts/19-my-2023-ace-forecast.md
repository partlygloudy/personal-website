# Interactive Chart - 2023 ACE Forecast
#### September 1, 2023 at 7:00 PM

I finally finished up a project I've been working on for a while - an interactive version of the model I've been using to make forecasts for the Metaculus question: *What will be the Accumulated Cyclone Energy of the 2023 Atlantic hurricane season on September 30, 2023?*

I'm mostly excited that I was actually able to learn enough d3.js to get the chart to look how I wanted and scale reasonably well to differently-sized screens. In the process, I also set up a bunch of tools that should make it way easier for me to create and publish more interactive charts like this in the future. So hopefully more cool charts coming soon!

The model itself isn't anything crazy (or at least, *I* didn't do any of the difficult modelling work). It's entirely based on the forecasts that Colorado State's Tropical Meteorology Project has been publishing each month. Based on how the community forecast has lined up with my own, it seems like lots of other forecasters are using this model as well (which makes sense, CSU's site is linked in the question details and the resolution is based on their data).



<iframe class="mychart-embed" width="100%" height="725px" src="https://charts.jakegloudemans.com/embed/ace-forecast-2023"></iframe>

The main challenge here is using CSU's full-season forecast to make real-time updates as actual data comes in. The CSU model gives a median ACE for the full 2023 season (160) and also includes a cumulative probability distribution from 0% to 100% which models the uncertainty in their estimate. 

Here's the approach I took to make daily forecasts:
1. I made the assumption that ACE builds along roughly the same-shaped curve each year, regardless of the final ACE. I'm not sure if this assumption is really valid or not - it's possible that, say, seasons with higher ACE are just especially active early/late in the year, rather than proportionally more active at all points during the season. However, I couldn't find daily ACE statistics for previous years, just the historical averages, so I settled for this approach.
2. Considering (1), I calculate a 'predicted' ACE for each day, if things were to follow the historical trend perfectly and end at the exact number predicted by the model. This is the dark green line on the chart and is just a scaled-up copy of the cyan line (historical average)
3. I look at what the CSU-model would predict for September 30th - CSU predicts an ACE of 160 for the full season, which comes out to about 123 on September 30th
4. Each day, I find the difference between the predicted ACE and the actual ACE on that day
5. I add this difference to the CSU-predicted value for September 30th. The result is the median I use in my distribution for that day.
6. To model the uncertainty, I start by finding the difference between the 25th percentile and median and between the 75th percentile and median, using the cumulative distribution from the CSU model
7. I scale these ranges down by a factor of 123/160 - this gives me the 25th and 75th percentiles for September 30th, on the day the CSU-model was released. Again, this is based on the assumption I made in (1) - if 75% of the action is expected to happen before September 30th, I'm assuming that 75% of the variance is there as well. I'm definitely not confident that this is a statistically valid thing to do, but it's probably not the worst strategy out there at least. 
8. I gradually scale this variance down, based on the proportion of the expected full-season ACE that has passed. So for example historically, about 1/3 of the September 30th ACE has accumulated by this point in the season. So I reduce the inter-quartile differences by about 1/3. (I will probably stop decaying this noise after a certain point, just because I don't really want the uncertainty to very close to zero in the last few days)

So far, this model has actually tracked the measured ACE values quite well! There was a quiet period in early August where there were several weeks with no storms at all, but Hurricanes Franklin and Idalia very quickly made up the deficit over the last week or so.