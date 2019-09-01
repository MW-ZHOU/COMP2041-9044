#!/usr/bin/perl -w

@lines = <STDIN>;
map {tr /aeiouAEIOU/AEIOUaeiou/} @lines;
print @lines;

# with shell it is more simple, just use tr
# tr aeiouAEIOU AEIOUaeiou
