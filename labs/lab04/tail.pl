#!/usr/bin/perl -w
$nLastLine = 10;
foreach $arg (@ARGV) {
	if ($arg eq "--version") {
		print "$0: version 0.1\n";
		exit 0;
	} elsif ($arg =~ /^-\d+$/) {
		# get the value of -N
		$nLastLine = $arg;
		$nLastLine =~ s/-//;
	} else {
		push @files, $arg;
	}
}
@stdInLines = <STDIN>;
print $#@stdInFile;
# while (@stdInFile) {
#     $i ++;
#     my $line = shift @stdInFile;
#     print "$line" if ($i > $lineNum - $nLastLine);
# }
foreach $file (@files) {
	open F, '<', $file or die "$0: Can't open $file: $!\n";
    # while (my $line = <F>) {
    #     $i++;
    #     print "$line" if ($i > $cnt - $nLastLine);
    # }
	close F;
}
