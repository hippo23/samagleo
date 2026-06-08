---
title: 'QA-Lidad: An Auditing System for UP Diliman - Department of Computer Science'
summary: "Our final project in CS140 (Operating Systems) made us recreate the PageRank calculator using only the C-standard library. No templates were given, strictly mathematical formulas. Through grit (and a good amount of luck), we managed to pull through."
thumbnail: /images/sqrt2.jpg
date: 2026-5-17
---

# QA-Lidad: An Auditing System for the Department of Computer Science

One of the main chokepoints found in many departments across UP Diliman is the lack of centralized record-keeping services in place for internal and external audits. For example, a few months ago, the Department of Computer Science underwent assessment under [AUN-QA](https://www.aunsec.org/discover-aun/thematic-networks/aun-q/aun-qa-member-universities). Internally, UP Diliman has [iAADS](https://qa.up.edu.ph/internal-quality-assurance) to monitor the performance of departments across the university based on a various number of metrics.

## The Solution

To alleviate this, me and a group of my classmates prototyped an auditing system that centralizes the iAADS statistics (but that can be adapted for other audits as well). Some of the records it covers include:

- Publications (local and international)
- Educational Attainment of Faculty
- Research Conferences & Awards
- Faculty SET (ratings given by student) scores

All of these were tracked on a per-semester basis.

### Data Pipeline

Constructing the data pipeline (from storing the records to deriving calculations from them) was my main duty.Based on the scale of the project, calculating metrics directly from the OLTP database could become messy unless normalization was sacrified to a certain degree. To avoid this problem, I opted to create a flow that tracks the changes in the OLTP database using [Estuary Flow](https://estuary.dev/) and materialize these changes into `.parquet` files in Google Cloud.

<br />

Once the files were stored on Google Cloud, they could then be read into the [DuckDB](https://duckdb.org/) database, a DBMS optimized for large aggregations. The database itself was structured as a star schema one, further leveraging the speed of DuckDB.

## The Final Result

<iframe
  src="https://drive.google.com/file/d/1GIi2No4CmMRvfsMMImOD18rMJ2myrKZ8/preview"
  width="100%"
  height="480"
  allow="autoplay"
/>
