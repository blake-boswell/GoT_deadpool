deadPool.controller('characterCtrl', function($scope) {
    $scope.chosen = {name: "", payout: 0};
    $scope.names = [
      "Tyrion Lannister",
      "Jaime Lannister",
      "Cersei Lannister",
      "Jon Snow",
      "Daenerys Targaryen",
      "Petyr Baelish (Little Finger)",
      "Davos Seaworth",
      "Melisandre",
      "Ellaria Sand",
      "Sansa Stark",
      "Missandei",
      "Sandor Clegane (the Hound)",
      "Arya Stark",
      "Varys",
      "Theon Greyjoy",
      "Samwell Tarly",
      "Brienne of Tarth",
      "Tormund Giantsbane",
      "Bran Stark",
      "Bronn",
      "Jorah Mormont",
      "Gilly",
      "Grey Worm",
      "Euron Greyjoy",
      "Gregor Clegane",
      "Archmaester Marwyn",
      "Eddison Tollett",
      "Beric Dondarrion",
      "the Night King",
      "Tycho Nestoris",
      "Marei",
      "Nymeria Sand",
      "Dickon Tarly",
      "Thoros of Myr",
      "Meera Reed",
      "Tyene Sand",
      "Qyburn",
      "Robett Glover",
      "Alys Karstark",
      "Podrick Payne",
      "Lyanna Mormont",
      "Olenna Tyrell",
      "Maester Wolkan",
      "Yohn Royce",
      "Yara Greyjoy"];

      $scope.toggleChoice = function(name) {
        console.log(name);
        $scope.chosen.name = name;
      };
});
