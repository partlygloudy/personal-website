# Go AIs have surprising vulnerabilities
#### July 15, 2023 at 3:33 PM 

> *We attack the state-of-the-art Go-playing AI system KataGo by training adversarial policies against it, achieving a >97% win rate against KataGo running at superhuman settings. Our adversaries do not win by playing Go well. Instead, they trick KataGo into making serious
blunders. Our attack transfers zero-shot to other superhuman Go-playing AIs, and is comprehensible to the extent that human experts can implement it without algorithmic assistance to consistently beat superhuman AIs. The core vulnerability uncovered by our attack persists even in KataGo agents adversarially trained to defend against our attack. Our results demonstrate that even superhuman AI systems may harbor surprising failure modes. Example games are available at [goattack.far.ai](http://goattack.far.ai/).*

… this from a [new paper](https://arxiv.org/pdf/2211.00241.pdf) by Far AI, MIT, and the Center for Human Compatible Intelligence. 

I think it’s fascinating that all deep learning systems seem to have some kind of failure mode like this. For example, ChatGPT had certain input tokens that [consistently triggered bizarre reponses](https://www.vice.com/en/article/epzyva/ai-chatgpt-tokens-words-break-reddit), and image classification models have long been known to be [susceptible to adversarial inputs](https://arxiv.org/pdf/1412.6572.pdf). You can train out the specific adversarial cases  if you know about them, but surely there's a bottomless supply of more cases that just haven't been found.

<figure>
    <img src="/static/img/posts/gpt-conv-1.png"
         alt="Screenshot of a conversation with ChatGPT, where the autogenerated 'conversation summary' is completely unrelated to the topic of the conversation">
    <figcaption>Today I tried a prompt that has <a href="https://futurism.com/weird-trick-breaks-chatgpt-brain">triggered strange outputs</a> from ChatGPT in the past, and while the prompt itself seems to have been patched, the "conversation summary" is... unexpected</figcaption>
</figure>

Deep learning models are crude, albeit extremely powerful, approximations of the things they’re modeling. If you know where to look, you can spot the imperfections in that approximation and exploit them to make the model do weird things. On the one hand, this seems sort of inevitable. A neural network is a big chain of math calculations that takes you from some numerical inputs to numerical outputs. After lots of training, they get pretty robust in terms of directing any input to a ‘reasonable’ output. But if you have access to the model weights, or even can just train against the model lots of times, as they did in the Go paper, it makes sense that you can craft adversarial inputs that screw things up.

What’s interesting is that humans don’t really seem to have this failure mode. The human equivalent of this would be if an average chess player trained against Magnus Carlsen for a year, and developed a method for hypnotizing him into playing poorly using a series of unusual moves - but then still wasn't actually good at chess and could be beaten by other average players. Of course I can't prove it, but I don’t think this scenario is possible. Magnus Carlsen possesses some fundamental \*understanding\* of chess that’s general enough that he can’t be fooled like this. It's fascinating that deep learning models can be so good at chess, go, etc., _without_ having this level of robustness.

Sure, humans have blind-spots, both literal and figurative, but they seem to be of a different kind. People will get *momentarily confused* by optical illusions or by misinterpreting sensory information (e.g. thinking every bush is a deer while driving at night), but there aren’t special words you can say or images you can show to someone that suddenly cause them to go insane (though this idea has come up  [in science fiction](https://en.wikipedia.org/wiki/BLIT_(short_story))). In this case, the KataGo-beater triggers a state of *permanent confusion* that the opponent isn’t able to recover from.