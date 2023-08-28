# Predictions #6
#### August 27, 2023 at 10:00 PM

I’ve been pretty busy with moving and starting a new job the last few weeks, so I’ve fallen a bit behind on documenting my tournament predictions. We’ve got some catching up to do!

Somehow I am now in 2nd place in the Quarterly Cup… While I think my predictions have been good enough that I should be in the top 10 or 15, it’s a bit of random good luck that has me all the way up to 2nd. My 2 best predictions (in terms of tournament score) of the tournament both were questions that I either put low effort into, or got very lucky with how they resolved. (see *Argentina Primary Election* and *World Cup % possession questions* in the resolution section below for more on that).

And of course, there’s still a long way to go, with less than half of the tournament questions resolved so far, so plenty of time to plummet back into obscurity!

| Current Metaculus Stats | <!-- -->                                                |
|-------------------------|---------------------------------------------------------|
| Total Points            | 975 <span style="color: lightseagreen">(+597)</span>    |
| Overall Rank            | 1183 <span style="color: lightseagreen">(-1351)</span>  |
| QC Resolved Qs          | 19 (+11)                                                |
| QC Open Qs              | 18 (-1)                                                 |
| QC Rank                 | 2 / 541* <span style="color: lightseagreen">(-5)</span> |
| QC Take                 | 6.6% <span style="color: lightseagreen">(+4.9%)</span>  |


*\*At this point, it’s not really fair to say I’m competing against 500+ people, there are probably more like 50-100 people who have actually been keeping up with the tournament and predicting on most of the questions. But it looks more impressive if I use the bigger number!*

## New Predictions:

### Will a non-proprietary LLM be in the top 5 of the [chat.lmsys.org](http://chat.lmsys.org) leaderboard on September 30, 2023?

This is a website that ranks various proprietary (GPT, Claude, PaLM) and non-proprietary (mostly variants of Meta’s LLaMA models) large language models, using [Elo Rankings](https://en.wikipedia.org/wiki/Elo_rating_system). Elo rankings assign scores to each participant by giving each one an initial number of points, and then re-distributing those points based on the results of head-to-head matchups between participants. Winners take points from the losers in each matchup, where the amount of points transferred is based on the difference in Elo between the two competitors. This is the strategy used for professional Chess rankings, among many other things.

The website works by letting users submit prompts and returning the outputs from two different models side-by-side. The user can then choose if one model’s output is noticeably better, or if they are about the same. User’s don’t see which model produced each response until after they’ve chosen which one is better. So the language models are ‘competing’ against each other, sort of like chess players playing games of chess. The models that consistently win more end up higher in the Elo rankings.

Currently the top 5 models in the rankings are all versions of either GPT or Claude, with a version of the LLaMA-based ‘Vicuna’ model ranked #6.

| Model            | Elo  | License                                           |
|------------------|------|---------------------------------------------------|
| GPT-4            | 1206 | proprietary                                       |
| Claude-1         | 1166 | proprietary                                       |
| Claude-instant-1 | 1138 | proprietary                                       |
| Claude-2         | 1135 | proprietary                                       |
| GPT-3.5-turbo    | 1122 | proprietary                                       |
| Vicuna-33B       | 1096 | non-proprietary                                   |
| Vicuna-13B       | 1051 | non-proprietary                                   |
| MPT-30B-chat     | 1046 | non-proprietary                                   |
| ...              | ...  | ...                                               |


From what I’ve read, it seems like newer versions of LLaMA-derived models may be able to displace GPT-3.5-turbo, if they were to be added to the website and accumulate sufficient data to be ranked. On the other hand, the site currently doesn’t include any of the newer PaLM variants (a Google proprietary LLM), which would likely rank near the top of the leaderboard. 

This question unfortunately is dependent on a lot of hard-to-predict details of how the site will be updated - for example, they are only adding a few models each month, and even the frequency at which they update the site is unclear. 

Given that the question only includes one month, and the site has only been adding a few new models each month, my starting point here is to assume the status quo, that the proprietary models will stay on top. Given my general lack of familiarity with the open source models, uncertainty around how the site will be updated, and the fact that some open source models apparently perform better than GPT-3.5-turbo on metrics listed in the rankings, I have very low confidence in either direction here. 

**Prediction**: 45% 

### What will the average partisan vote swing from 2020 to 2023 be in the next 4 state-level special elections?

The details of this question are somewhat complicated and hard to summarize concisely, but roughly speaking:

- there are 4 state-level special elections  scheduled for the next month (these are elections to replace a candidate who has resigned, died, or otherwise vacated their seat before their term ended)
- For each of these elections, find Biden’s margin of victory in the relevant district during the 2020 presidential election
- Take the margin of victory (or defeat) for the democratic candidate in each of these 4 elections
- Subtract Biden’s 2020 margin of victory
- Take the average of this number across the 4 special elections

The question details link to a [spreadsheet](https://docs.google.com/spreadsheets/d/11ZlsgliiaOa92s9PkoSW244QbfxWZbw8cIW4TF_TTKU/edit#gid=2073652358) that some [election analyst on Twitter](https://twitter.com/ECaliberSeven) has been maintaining, which tracks this data for all special elections so far in 2023 (there have been 27 so far).

This data gives us a hint as to how the electoral environment today compares to the environment the day of the 2020 presidential election. Recent special election results are one of the better indicators to use when trying to predict the results of upcoming elections. Since the overturning of Roe vs. Wade, democrats have been performing very strongly in special elections relative to Biden’s 2020 margins.

To make a prediction for this question, I used the following approach:

- assume that the 4 upcoming special elections are drawn from roughly the same distribution as the previous 27 elections in the dataset
- run 1000 “simulations” of those 4 elections by randomly selecting 4 results from the dataset and computing the average
- these 1000 trials give us a new distribution which should roughly model the question at hand
- Find the 25, 50, and 75 %-iles of the new distribution (which should be approximately normal) and use this to specify the distribution for the question.

<figure >
    <img src="/static/img/posts/18-special-elections-dist-base.svg"
         alt="Histogram showing the distribution of special election results so far this year (2023 margin relative to Biden 2020 margin). Samples were draw randomly from this distribution">
    <figcaption>Distribution of special election results so far this year (2023 margin relative to Biden 2020 margin). Samples were draw randomly from this distribution</figcaption>
</figure>

<figure style="margin-top: 25px">
    <img src="/static/img/posts/18-special-elections-dist-sample.svg"
         alt="Histogram showing the distribution created by averaging 4 randomly drawn samples from the above distribution, and repeating 1000 times">
    <figcaption>Distribution created by averaging 4 randomly drawn samples from the above distribution, and repeating 1000 times</figcaption>
</figure>

According the ChatGPT, this method is called “bootstrapping” and is probably a reasonable way to approach the question. To run these ‘simulations’ I described the problem the ChatGPT Code Interpreter and uploaded a CSV with the previous 2023 results, and then it wrote the python code, ran the trials, and returned a new CSV with all the trial results. Really cool! \[here’s a [link to the conversation](https://chat.openai.com/share/349516cc-f4b2-497f-9b61-e56737c7da6e)\] 

The 1000 trials had a **median of 6.6% and an IQR of 1.8% - 10.9%**, which is what I used to specify the distribution on Metaculus.

### Will Putin attend the G20 summit in India?

A few weeks ago, there was some speculation that Putin may attend the upcoming G20 summit in India *in person* which would have been quite significant, given the presence of many countries actively aiding Ukraine’s defense at the meeting. 

This always seemed pretty unlikely - I opened at 15%, briefly raised this into the 30s after some news articles suggested it might actually happen, and then quickly lowered to 1% after the Kremlin announced he would not be attending in person. It just seemed like there was way more for Putin to lose than to gain by attending. Most of the other countries at the summit would have been very antagonistic towards him, and there would probably have been lots of unflattering press / photos / speeches from other countries loudly denouncing him. 

### Will the House Oversight Committee receive un-redacted copies of any of the documents they requested related to Hunter Biden’s Ukraine dealings before September 1st?

The House Oversight Committee (a 47-member House committee, currently controlled by Republicans by a 26/21 split), is currently investigating the Biden family in regard to Hunter Biden’s business dealings while Joe Biden was serving as Vice President to President Obama. Under the [Presidential Records Act](https://www.archives.gov/presidential-libraries/laws/1978-act.html), official records created by the President or Vice President during their tenure become publicly owned 5 years after the end of the administration.

The committee had previously received a bunch of documents pertaining to the investigation, however those documents were heavily redacted. They are [now requesting un-redacted copies](https://thehill.com/homenews/house/4157161-comer-asks-national-archives-for-unredacted-biden-emails-involving-hunter-and-ukraine/) of the documents which they claim they are authorized to access under the Presidential Records Act.

They requested several different groups of documents, and the question resolves yes if un-redacted versions of any subset of the requested documents are provided by the National Archives.

The request was sent mid-August, asking that the documents be supplied by August 31st, which explains the September 1 end date for the question.

This is all pretty unfamiliar territory for me, so I didn’t have a strong conviction either way. Some of my considerations:

- If the documents are going to be provided, they will *probably* be provided within the requested timeframe (or at least some of them will be)
- If the documents are provided, there will probably be credible reporting on this right away (which is necessary for resolution)
- So, the bulk of the probability is *will the National Archives grant the request?*
- They only need to give access to a subset of the documents, not all of them. It seems fairly likely that at least *some* of the documents are non-sensitive enough that they can provide them un-redacted
- The Committee’s request doesn't seem particularly unreasonable as far as I can tell? They’re conducting an investigation within their jurisdiction, and the documents in question probably really would help with that investigation. So unless there are major national security implications of the contents of the documents (which seems rather unlikely - they’re mostly about various business dealings?), it seems like they should be provided?
- That said, I'm very unfamiliar with the inner workings of these government agencies, and I can also imagine scenarios where they eventually give access to the documents, but request more time to figure out which things they can/can’t safely un-redact (i.e. maybe the first bullet point above is a bad assumption), or there's some other administrative issue that holds things up.

My initial feeling was that this was more likely than not, but this wasn't a strong conviction - I opened with a prediction of 67%. 

A day later, after the community forecast was revealed, the community was at 12%. I’m really not sure why it’s that low and there are no comments on the question so far explaining why it should be. So there may be some herding / information cascade behavior happening. That said, I’m very unfamiliar with the matter and the community may know more than me here, so I lowered my prediction to 40% after seeing this.

### Will the WHO name BA.2.86 a ‘variant of interest’ before October 1, 2023?

BA.2.86 is a recently detected Covid variant that’s caught scientists’ attention due to it’s very high number of mutations, relative to the variants it evolved from. Eric Topol has a (fairly technical) write-up of it [here](https://erictopol.substack.com/p/a-quick-update-on-the-ba286-variant).

The high number of mutations are likely to mean that this variant will be better at “immune escape”, because it looks significantly different in many respects than the viruses our antibodies are designed to detect. This *could* mean that it’s more likely to cause symptoms in those infected. 

On the other hand, only a very small number of samples have been collected, and we don’t yet know how *transmissible* the variant is. If it’s not more transmissible than the existing dominant variants, it’s unlikely to have much impact.

Omicron was such a big issue because (1) like this new variant, it had very significant mutations, (2) it was extremely transmissible relative to the existing dominant variants, and (3) much of the population still hadn't been exposed to the virus / vaccines at that time. These factors together caused it to spread extremely quickly and temporarily overwhelm the medical system.

The WHO labels variants as “variants to monitor”, “variants of interest”, and “variants of concern”, based on different criteria. BA.2.86 is currently a “variant to monitor”. To be upgraded to a “variant of interest”, it needs to 

- have genetic changes predicted or demonstrated to affect transmissibility, virulence, antibody evasion, or susceptibility to therapeutics, AND
- have a demonstrated growth advantage over other variants in multiple WHO regions

As far as I can tell, the first of these criteria is already met, and if anything, the only reason it wouldn't be satisfied already is just an insufficient number of samples analyzed. Given the significant interest in the variant, it seems like this criteria will definitely be satisfied within a month.

I’m much more skeptical that the 2nd criteria will be satisfied by the end of September. The current prevalence is still a tiny fraction of a % (probably less than 100 total cases detected in total), so even if it has a significant growth advantage, it will be many weeks before this is apparent. The EG.5 variant, which has a very clear growth advantage, and has recently become one the most prevalent variants, wasn't labelled a variant of interest until it was well over 10% of all worldwide cases. 

That is to say, even if BA.2.86 does have a strong growth advantage, there’s a good chance it won’t earn the “variant of interest” designation within the question timeframe.

There’s still very limited information about the variant, and this is by no means an area I’m an expert in, so I don’t want to make a super confident prediction here. But my current guess is that this is unlikely.

**Prediction**: 20%

### What will the median % prevalence of EG.5 in the US be for the biweekly periods for August 19th and September 2? 

Honestly, I was very busy when this question popped up, and I don’t really have experience predicting on questions like this previously, so I didn’t put a ton of effort into this one. There’s a good chance I will get totally hammered on this.

The question is based on [this CDC page](https://covid.cdc.gov/covid-data-tracker/#variant-proportions), which tracks the proportion of each different known Covid variant as a percentage of new cases, and is updated every two weeks. The question is asking for predictions on what the prevalence of the EG.5 variant will be on 8/19 and 9/2. 

To make predictions, I plotted all the prior % values for EG.5, fitted a curve (I just used a polynomial curve that looked like it fit the nicest), and then extrapolated to the dates in question. Then I reduced this number a bit because I figured the actual curve these things follow is more of an ‘S’ / sigmoid shape, and that we’re probably approaching the middle of the slope. And then I added uncertainty that “felt about right”, around those center points.

It turned out that I wasn’t ********that******** different from what the community distribution ended up looking like, but mine was both a bit higher % prevalence, and also quite a bit less uncertainty. So I will probably do either very well or very poorly.

## Resolved Questions:

### What % of the vote will Javier Milei receive in Argentina’s Presidential Primary Election?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-argentina.png)


In what turned out to be a big polling miss, Javier Milei finished with the highest vote share in the primary, finishing with 30% of the vote, despite polling around 20% (in 3rd place) in the weeks before the election. 

I don’t have ton of commentary here, since (as I wrote a few weeks ago) I really mailed this one in from a forecasting perspective and just centered my distribution around the polling average. Ironically, this somehow ended up being my 2nd best question so far in terms of *tournament score,* apparently because I gave my distribution slightly wider tails than most people did - this meant that I gave a proportionally much higher chance of an ‘outlier’ outcome than most people did, and since the result was indeed an outlier, I outperformed most people.

I wish I could say that I put lots of thought into this and decided “I don’t trust this polling, I’m going to use a wider distribution”, but truthfully I think it was pretty random and I just got lucky!

### What % of possession will the winning team have in the Women’s World Cup Final?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-world-cup.png)

On this question, which is now my best question of the tournament, I both made a great prediction and also got incredibly, undeservedly lucky. Let me explain.

The question specifically asked about what % of possession the winning team would have, *according to FIFA’s results page* for the match. I didn’t bother to check FIFA.com to see how they report possession - I assumed they would report it like every other site does: Team A had X%, Team B had (100 - X)%, together they add to 100%. I looked at some historical data from ESPN (which reports possession the normal way), did some calculations, and decided the winning team would probably end up with about 55% possession, with a pretty wide distribution of outcomes. 

When I woke up and checked the score, I was delighted to find out that Spain, the winning team, ended up with 57% possession, so I was going to have an excellent score for the question!

To my dismay, the question resolved to 43%, at which time I discovered that FIFA actually includes “contested possession” as an extra category which significantly reduces the possession share for each of the individual teams. So my score was terrible, easily my worst score of the tournament.

I left a comment complaining that there was some misleading information in the question's background info (which was true, all their linked sources aside from the FIFA ones used the normal version of the stat), and it should have been pointed out that FIFA reports this statistic differently from everywhere else. There was some discussion as to whether the question should be annulled, but ultimately I (rightly) lost that argument. However, it turned out that FIFA eventually revised the match statistics, and now even with the contested possession factored in, Spain was at 60% possession. What!? After this revision, this was now my best prediction of the tournament and I was vaulted to 2nd place.

So in the end, I feel like I somewhat deserve the good score I got, since I actually nailed the question I had predicted on, even if I had predicted the wrong thing. But also, I got extremely lucky!

### Will India’s Chandrayaan-3 mission successfully land a rover on the moon?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-chandrayaan.png)

Chandrayaan-3 did successfully land on the moon and deploy it's rover - congrats India! I predicted Yes here, but with lower confidence than the field overall, so my tournament score was negative. I think my reasoning was okay - I was mainly sticking with the base rate which was about 50/50 - however I think now in hindsight I can see a few things worth adjusting on moving forward:

- India was quite close in their previous attempt, much closer than, for example, Russia’s recent Luna-25 attempt
- This attempt being a follow-up to a recent, close attempt should maybe have increased my confidence more than it did. I wasn’t sure how much of a boost this should give, but I probably undervalued it
- India’s space program seems to be very competent, quickly becoming one of the best in the world. Competence / track record of a space program should be a big consideration when looking at this type of question

### Will Meta launch a Threads web app before October 1, 2023?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-threads-web.png)

Meta did indeed launch a web version of Threads a few days ago. I was very confident on this one from the open, because it seemed like (a) imperative from a business perspective that they launch this quickly, and (b) executives from the Threads team were strongly hinting that they were actively working on it. 

Unfortunately, there was a fairly long delay between when Mark Zuckerberg explicitly stated that a web version was imminent (which moved the whole community to 99%) and when it actually launched, so my big early advantage vs. the field diminished quite a bit. Still gained a bit of ground though.

### Will Donald Trump participate in the first Republican presidential debate?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-trump-debate.png)

This seemed unlikely because:

- There were reports saying that all of Trump’s advisors were telling him not to debate
- He had made comments along the lines of “why should I debate when I have such a big lead”
- His schedule seemed busy between all the various indictments and logistics around that
- Strategically, it seemed like skipping it was smarter, since most of the candidates won’t criticize him directly. It gives the whole debate a junior-varsity team feel. If it turns out the other candidates start gaining ground after the debate, you can always still go to the later ones

I was a little under the community the whole way here and so ended up with a pretty good tournament score here.

### Will the oil transfer from the FSO Safer finish in 19 days?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-fso-safer.png)

This one played out pretty much exactly as expected. There were really no issues the whole way, and the transfer finished a few days before the deadline. The one thing that worried me a little towards the end was that there way me a long period right at the end as they removed the last bit of oil, but the transfer rate ended up being pretty much constant the whole way.

Still though, I think the reasoning that once the transfer started, there was very low risk of a disruption and the salvage company would give a conservative time estimate anyway, held up quite well.

### Will ECOWAS launch a military intervention in Niger before August 12?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-ecowas-intervention.png)

My prediction history on this one was wild, lol. In the end, my score was basically zero, which I am totally fine with, but my forecasting was frenetic. 

I think the lesson here is that for rapidly unfolding events, particularly those with the “fog of war”, where reliable information is hard to come by, it’s probably best to not make sudden large adjustments to the prediction, absent very compelling new evidence. The reason my predictions look so crazy is that I kept overreacting to Tweets, and then realizing I had overreacted and correcting back to about where I was before. 

There’s definitely some pressure where I want to react quickly and decisively to important news to get an edge by being ahead of the field for a while. But actually I don’t think there’s really that much to gain from doing this - if the evidence really is compelling, it will trickle out to the community pretty quickly anyway, so you’re not gaining all that much by getting a head start. And if it isn’t compelling, then you shouldn’t be reacting strongly to it.

Much of my individual advantage comes from interpreting the evidence in a more accurate way then other predictors, rather than just getting the best evidence faster. 

### Will any of Donald Trump’s alleged co-conspirators be indicted before August 11th?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-trump-co-conspirators.png)

No too much to say about this one. This seemed unlikely given news reports and the short time frame, and after the first few weekdays passed, the forecast dropped to the single digits.

Interestingly, some (maybe all?) of these co-conspirators were actually indicted a week or so after the question resolution in the *Georgia* case, which I believe would still have resolved this to Yes. Given that there wasn’t any news indicating that indictments from the Georgia case were imminent, it was okay to not consider that a major factor, but that was definitely a blind spot that could have come back to bite me.

### Will Luisa González receive the most votes in the first round of the Ecuadorian election?

![Plot showing my forecast vs. the Metaculus forecast for this question](/static/img/posts/18-metaculus-ecuador-gonzales.png)

González had a strong lead in almost every poll in the run-up to the election, which would have indicated a pretty high probability here, but there were a few factors that added a dose of uncertainty:

- About 2 weeks before the election, one of the candidates was assassinated - crime / gang violence was already a major issue for voters and that became even more true after the assassination. My impression was that González was not seen as the strongest candidate on this issue.
- Additionally, there was only one poll after the assassination before the election, and it showed a far right candidate who had gained ground over the last month, polling very close to González. So the idea that there could have been a large shift in voter sentiment very late in the race did not seem far-fetched
- There was a huge polling miss in the recent primary elections in Argentina, where Javier Milei led the field and massively outperformed his polling numbers. This made me more dubious of the general polling accuracy for this election

González winning still seemed like the most likely outcome, but I only predicted this with 70% confidence - this ended up being close to where the community was as well. González  did end up winning, but there did actually turn out to be a big polling miss. Daniel Noboa, who had been polling consistently under 5%, ended up in second place behind González , capturing 23.4% of the vote. 

I think a general lesson between this result and the Argentina result is that there is simply way less polling in most countries compared to the US, not to mention no groups like FiveThirtyEight who are grading pollsters and making detailed forecasts, so the level of uncertainty in these elections is just much higher than in the US. And of course there’s still plenty of uncertainty in US elections as well.