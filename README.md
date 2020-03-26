# web-mapping-final

## About
This site was created as a final project for my Web Mapping Class at NYU Wagner. For this site, I wanted to look at publicly accessible transit data to create a map that gave a well-rounded look at accessibility on the NYC Subway system.

## Data
1. [NYC Subway Lines Shapefile, Baruch College NYC Mass Transit Spatial Layers](https://www.baruch.cuny.edu/confluence/pages/viewpage.action?pageId=28016896)
2. [NYC Subway Stations Shapefile, Baruch College NYC Mass Transit Spatial Layers](https://www.baruch.cuny.edu/confluence/pages/viewpage.action?pageId=28016896)
3. Information on station accessibility pulled by hand from the [MTA's Website](http://web.mta.info/accessibility/stations.htm)
4. [MTA Elevator & Escalator Outage Data](http://eedashboard.mta.info/)

If you would like to get your own MTA elevator outage data, go to the MTA Elevator and Escalator Performance Dashboard, click “E&E performance summary.” From there you are able to select the month(s) of data to export as a CSV.

## Methodology
Using QGIS, I added a column to each station, labeling 0 or 1 depending on if the station was accessible or not. I used the list of accessible stations from the [MTA's website](http://web.mta.info/accessibility/stations.htm) to determine this. If there was only an elevator that led to a train in only one direction or just to the mezzanine, I counted those stations as inaccessible. Those stations are effectively inaccessible for someone who relies on an elevator completely. I then tallied up the elevator outage data from the [MTA Dashboard](http://eedashboard.mta.info/) from February 2020.

The limitation with this data is that many stations combine all the lines that run through it, so I was unable to separate outages by specific subway line. Outage data was unfortunately not available for the Staten Island Railroad (SIR) either.

## Github pages
You can visit my site [here](https://olivialimone.github.io/web-mapping-final/)!
