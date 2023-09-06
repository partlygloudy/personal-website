# ACE model update
#### September 6, 2023 at 12:15 AM

After explaining the methodology behind my cyclone energy forecast in the Metaculus comments, another user helpfully pointed out that the way I'm interpolating my uncertainty ranges from the full-season values is not correct. To be fair, I had assumed that my approach was probably not right, but now I know a better way to do it!

The problem is that I was scaling down the *inter-quartile ranges* for the full season linearly with respect to the percentage of the full-season ACE that should have accumulated by that day. For example, on the day when (looking at the historical average) we would have expected 30% of the full season's cyclone energy to have accumulated, I was scaling down the inter-quartile range to 70% of the initial value. 

The problem is that inter-quartile ranges are proportional to *standard deviation*, and it's *variance*, not standard deviation which should scale linearly like this. 

If you think of the ACE on each day as a random variable with some mean and variance, the full-season ACE is the sum of all those individual random variables. When adding two random variables, the variance of the sum is equal to the sum of the individual variances*. But the same is not true for standard deviation, which is the square root of the variance!

So on the day when 30% of the cyclone energy has accumulated historically, the variance should be 70% of what it was initially, while the inter-quartile range should be scaled by the *the square root of 70%*, which is 84%.

This correction makes the forecast less certain than it was previously, which means I've been predicting with too high of confidence for most of the question period. So if we end up with any kind of outlier result, I may get penalized pretty harshly.

**This assumes that the ACE for each day is independent of the other days, which definitely isn't true, but is an assumption I'm okay with making for the sake of creating a simple model*