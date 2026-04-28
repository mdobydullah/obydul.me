---
title: "A Hack, 15 Sleepless Nights and the Biggest Lesson of My Career"
summary: "January 2020. Exposed PHPMyAdmin on a live server. An attacker pulled £5,000 of stock and would not leave. Fifteen days of cat-and-mouse to find the door and shut it."
date: "2026-04-28"
tags: ["security", "infrastructure", "war-story"]
featured: true
---

We are living in the age of AI.

I ask AI to do something, and it gets done in seconds. Work is faster, productivity is higher, and a lot of things that once took hours now take minutes.

But somehow, I do not always feel the same satisfaction I used to.

There was a time when solving a problem after hours, or even days, of struggle gave me a feeling that is hard to describe. That deep sense of achievement after finally finding the root cause, fixing it, and learning something new along the way.

Today, I want to share a story from 2020. Looking back, it was one of the most important learning experiences of my career.

I started seriously practicing hacking and security in 2020, although my interest in cybersecurity actually began much earlier, around the 2012 cyber conflict between India and Bangladesh. That was when I first became deeply curious about how systems break and how they can be protected.

## January 7, 2020

Then, on January 7, 2020, one of the applications I had developed became the victim of its first real attack.

At that time, I was still new to server management. I did not have a solid understanding of open ports, server hardening, or security best practices.

During development, I used PHPMyAdmin frequently. Unfortunately, I had also deployed it on the live server.

Later, I realized that this was one of the biggest mistakes I had made.

The attacker exploited that weakness and uploaded a shell to the server. Once the shell was in place, they were able to access sensitive files, including the `.env` file, which exposed critical configuration details.

At that stage of my career, my security knowledge was limited.

## Ten days of dead ends

For the next several days, I barely slept. I spent almost every waking hour searching, checking logs, reviewing server configurations, and trying to understand how the breach had happened.

This was a live project, and during the attack, the hacker managed to take stock worth more than 5,000 pounds.

For the first ten days, I had no real clue how they were still getting in.

## A note in the file

Then I did something unusual.

I left my email address inside a file on the server and asked the attacker to contact me.

Surprisingly, they replied.

They wrote “Hello Obydul” right below my message in the file, and later even sent me an email.

![Hello from Hacker](/img/writing/a-hack-15-sleepless-nights/screenshot1.jpg)

That was the beginning of a strange psychological game.

They offered me opportunities to work with them and promised different kinds of benefits. I never responded aggressively. Instead, I spoke to them respectfully and almost playfully.

I would say things like, “You are really an expert. I want to learn from someone like you.”

In reality, I was buying time.

I was observing their behavior, testing how they still had access, and trying to understand the attack path.

At one point, I changed the database password in the `.env` file and asked them, “Can you tell me what my password is now?”

To my surprise, they instantly replied with the new password.

That was the moment I knew the access was still active.

So I kept testing.

I deleted their shells, and they would upload them again in another folder.

It became a cat-and-mouse game.

They were probably enjoying it.

But I was learning.

Every move they made taught me something new about systems, access control, and attacker behavior.

## Finding the door

Eventually, my attention turned to PHPMyAdmin.

That was when I finally discovered the real issue.

The port was open, exposed, and being used as the main attack vector.

Immediately, I locked down the server.

I closed unnecessary ports, removed PHPMyAdmin entirely from the live environment, deleted every shell I could find, tightened permissions, and started hardening the infrastructure.

Then I challenged the attacker again.

“Try accessing it now.”

They tried.

They failed.

![Access Denied](/img/writing/a-hack-15-sleepless-nights/screenshot2.jpg)

No matter how many attempts they made, they could no longer get in.

## What stayed with me

That incident taught me more about server security, exposed ports, shell attacks, permissions, and infrastructure hardening than any tutorial ever could.

Since then, I have faced many different kinds of attack attempts, and even today, security threats are something we deal with regularly.

But that first incident changed me.

It was a turning point in my career.

Today, in the AI era, many things can be solved quickly with the right prompt. Over the past year, AI has helped me move much faster in coding and problem-solving.

Still, those sleepless nights, digging through logs, understanding the attacker’s mindset, and finding the root cause with my own hands gave me a kind of satisfaction that is hard to replace.

Maybe that is why I have been spending more time again on fundamentals, DSA, system design, security basics, and understanding how AI itself works under the hood.
