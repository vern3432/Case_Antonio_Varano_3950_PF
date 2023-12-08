import './about_style.css';

function About() {
    return <main>
    <h1>About Us</h1>
    <input id="radio1" type="radio" name="css-tabs" ></input>
    <input id="radio2" type="radio" name="css-tabs"></input>
    <input id="radio3" type="radio" name="css-tabs"></input>
    <input id="radio4" type="radio" name="css-tabs"></input>
    <div id="tabs">
      <label id="tab1" for="radio1">Our Company </label>
      <label id="tab2" for="radio2">Services</label>
      <label id="tab3" for="radio3">Locations</label>
      <label id="tab4" for="radio4">Our Staff</label>
    </div>
    <div id="content">
      <section id="content1">
        <h3>Information Comapny and Origin</h3>
        <p>
        Old versions of SPSS limited string variables to a width of 255 bytes. For backward compatibility with these older versions, the system file format represents a string longer than 255 bytes, called a very long string, as a collection of strings no longer than 255 bytes each. The strings concatenated to make a very long string are called its segments; for consistency, variables other than very long strings are considered to have a single segment.

A very long string with a width of w has n = (w + 251) / 252 segments, that is, one segment for every 252 bytes of width, rounding up. It would be logical, then, for each of the segments except the last to have a width of 252 and the last segment to have the remainder, but this is not the case. In fact, each segment except the last has a width of 255 bytes. The last segment has width w - (n - 1) * 252; some versions of SPSS make it slightly wider, but not wide enough to make the last segment require another 8 bytes of data.

Data is packed tightly into segments of a very long string, 255 bytes per segment. Because 255 bytes of segment data are allocated for every 252 bytes of the very long string’s width (approximately), some unused space is left over at the end of the allocated segments. Data in unused space is ignored.

Example: Consider a very long string of width 20,000. Such a very long string has 20,000 / 252 = 80 (rounding up) segments. The first 79 segments have width 255; the last segment has width 20,000 - 79 * 252 = 92 or slightly wider (up to 96 bytes, the next multiple of 8). The very long string’s data is actually stored in the 19,890 bytes in the first 78 segments, plus the first 110 bytes of the 79th segment (19,890 + 110 = 20,000). The remaining 145 bytes of the 79th segment and all 92 bytes of the 80th segment are unused.

The very long string record explains how to stitch together segments to obtain very long string data. For each of the very long string variables in the dictionary, it specifies the name of its first segment’s variable and the very long string variable’s actual width. The remaining segments immediately follow the named variable in the system file’s dictionary.

The very long string record, which is present only if the system file contains very long string variables, has the following format:
        </p>
                <p>
        Old versions of SPSS limited string variables to a width of 255 bytes. For backward compatibility with these older versions, the system file format represents a string longer than 255 bytes, called a very long string, as a collection of strings no longer than 255 bytes each. The strings concatenated to make a very long string are called its segments; for consistency, variables other than very long strings are considered to have a single segment.

A very long string with a width of w has n = (w + 251) / 252 segments, that is, one segment for every 252 bytes of width, rounding up. It would be logical, then, for each of the segments except the last to have a width of 252 and the last segment to have the remainder, but this is not the case. In fact, each segment except the last has a width of 255 bytes. The last segment has width w - (n - 1) * 252; some versions of SPSS make it slightly wider, but not wide enough to make the last segment require another 8 bytes of data.

Data is packed tightly into segments of a very long string, 255 bytes per segment. Because 255 bytes of segment data are allocated for every 252 bytes of the very long string’s width (approximately), some unused space is left over at the end of the allocated segments. Data in unused space is ignored.

Example: Consider a very long string of width 20,000. Such a very long string has 20,000 / 252 = 80 (rounding up) segments. The first 79 segments have width 255; the last segment has width 20,000 - 79 * 252 = 92 or slightly wider (up to 96 bytes, the next multiple of 8). The very long string’s data is actually stored in the 19,890 bytes in the first 78 segments, plus the first 110 bytes of the 79th segment (19,890 + 110 = 20,000). The remaining 145 bytes of the 79th segment and all 92 bytes of the 80th segment are unused.

The very long string record explains how to stitch together segments to obtain very long string data. For each of the very long string variables in the dictionary, it specifies the name of its first segment’s variable and the very long string variable’s actual width. The remaining segments immediately follow the named variable in the system file’s dictionary.

The very long string record, which is present only if the system file contains very long string variables, has the following format:
        </p>
      </section>
      <section id="content2">
      <h3>Information of Offered Servers</h3>

      </section>
      <section id="content3">
      <h3>Locations With Offer with Links to Directions redirect</h3>

      </section>
      <section id="content4">
      <h3>List of Staff</h3>
     
      </section>
    </div>

  </main>





    
  }

export default About;