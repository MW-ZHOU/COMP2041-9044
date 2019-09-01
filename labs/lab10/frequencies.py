#!/usr/bin/python

import fileinput, collections, sys, re

freq = collections.defaultdict(int)

for line in fileinput.input():
    chars = list(line)
    for c in chars:
        if c.isalnum():
            freq[c] += 1

for f in sorted(freq):
    # f-string is great
    print(f"'{f}' occurred {freq[f]} times")
