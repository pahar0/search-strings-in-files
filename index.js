const fs = require("fs");
const path = require("path");

// strings to search
const searchStrings = ["facilisis", "scelerisque", "string that doesnt appears"];

// file reports suffix + extension
const suffix_rep = "_report.txt";

// remember to escape backslashes with more backslashes 4Head
const prefix_rex = "\\b\\w*";
const suffix_rex = "\\w*\\b";

const fileObjs = fs.readdirSync(__dirname + "/files/", { withFileTypes: true });
if (fileObjs.length !== 0) {
  fileObjs.forEach((file) => {
    var report_info = "", report_strings_found = [], report_strings_notfound = [];
    let data = fs.readFileSync(__dirname + "/files/" + file.name, { encoding: "utf8", flag: "r" });
    report_info = file.name + "\n" + "^".repeat(file.name.length) + "\n\n"
    searchStrings.sort().forEach((string) => {
      let search_fields, len_search_total = 0;
      let rex = prefix_rex + string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&") + suffix_rex;
      let search_rex = data.match(new RegExp(rex, "g"));
      if (search_rex) {
        len_search_total = search_rex.length;
        search_fields = [...new Set(search_rex)].sort();
        report_info = report_info + "----- " + string + " ----- \n";
        report_info = report_info + "total occurrences: " + len_search_total + " \n\n";
        report_strings_found = [...report_strings_found, ...search_fields].sort();
      } else {
        report_info = report_info + "----- " + string + " ----- \n";
        report_info = report_info + "total occurrences: 0 \n\n";
        report_strings_notfound = [...report_strings_notfound, ...[string]].sort();
      }
    });
    report_strings_found = report_strings_found.join("\n");
    report_info = report_info + "##### strings found ##### \n" + report_strings_found + "\n\n";
    report_strings_notfound = report_strings_notfound.join("\n");
    report_info = report_info + "##### strings not found ##### \n" + report_strings_notfound;
    fs.writeFile(__dirname + "/reports/" + path.parse(file.name).name + suffix_rep, report_info, (err) => {
      if (err) return console.log(err);
      console.log("report for " + file.name + " created at ./reports/" + path.parse(file.name).name + suffix_rep);
    });
  });
} else {
  console.log("folder ./files is empty");
}