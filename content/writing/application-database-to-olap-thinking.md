---
title: "From Application Database to the Beginning of OLAP Thinking"
summary: "2020. Reports on a growing eCommerce DB kept slowing down. Years of indexing tricks and Stack Overflow advice before stumbling onto Redshift, ClickHouse, and the realization that the application database was never the right place for analytics."
date: "2026-04-30"
tags: ["databases", "olap", "clickhouse"]
featured: true
---

For the past few days, I have been feeling like writing down some memories from this small journey of my career. It may feel a bit ordinary to many people, but to me, these moments are truly valuable. So I am sharing this simply as a memory. Insha’Allah, I will also share some of my recent experiences in the coming days.

Since 2016, I worked on many small and medium-sized projects on Fiverr, and later on Upwork. At that time, most of my work was focused on web and app development, along with bug fixing. I did not really get much opportunity to work deeply with databases.

Back then, I was still in university. I did not have enough time to take on large projects. Even before finishing university, I received job offers from a few good companies outside my country. Then, in May 2018, I joined Electronic First as a full-time engineer. I had been working there part-time since 2017.

After joining, I gradually started to understand how many different kinds of problems come up when working on large-scale projects. Real engineering challenges started appearing from that point.

## When data became the problem

Around the middle of 2020, I started thinking seriously about data. New data was being added to the database every single day, and all of it was very important, especially transaction data.

As the data kept growing, query time also started increasing. This was an eCommerce website where we had to generate different kinds of reports. It was not only the reports, even normal product queries and other complex queries were taking much longer.

That was the point where my interest in databases really started.

## Learning alone

At that time, my resources were mostly blogs, YouTube, Google, and Stack Overflow. I was not very active in the local IT community, so I did not really have senior people around me to ask directly. I was learning on my own and figuring things out by myself.

That was when I first became familiar with concepts like indexing and normalization, although I could not fully understand them in the beginning. Because of other work responsibilities, I could not dedicate enough time to databases. But the reporting issue kept bothering me the most.

On September 30, 2021, I made a post in the Talk.js Facebook group about database speed. Many senior professionals left very informative comments. To be honest, their insights helped me a lot. Even then, I was still unable to make the reporting fast enough.

I always kept wondering how large companies generated reports so quickly.

## Finding OLAP

After more research, I came across Amazon Redshift and ClickHouse. As I continued exploring, I finally realized that generating all reports directly from the application database was not really the right approach.

No matter how much optimization we do, there is always a limit.

That was the moment when I first truly understood the concept of OLAP and analytical databases.

After that, I set up ClickHouse for our project. Honestly, I was amazed by its performance. Large reports were being generated incredibly fast, and the load on our main application database dropped significantly.

## Looking back

Even though I had been working for clients since 2016, it still took me several years to gain a clear understanding of reporting databases and data warehousing.

Today, we use ClickHouse in production for reporting, write complex queries, and now AI has made query drafting much easier as well.

This experience may seem ordinary from the outside, but it was an important part of my professional journey.
