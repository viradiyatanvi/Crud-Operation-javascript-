    let data = [];
    if (localStorage.getItem("object")) {
      data = JSON.parse(localStorage.getItem("object"));
    } else {
      data = [
        {
          id: 1,
          name: "kitu",
          email: "k@gmail.com",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGztSbRkpilBaAz_-5w4narqP_SbVX3WFWA&s",
          tel: "99567 67895",
          hobbies: ["Cricket"],
          gender: "Male",
          city: "Ahmedabad"
        },
        {
          id: 2,
          name: "vasu",
          email: "vasu@gmail.com",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2PlVyr1R4_ILdj-vZfaJyqhuDi2LMERtssg&s",
          tel: "87657 56487",
          hobbies: ["Music"],
          gender: "Female",
          city: "Surat"
        }
      ];
      localStorage.setItem("object", JSON.stringify(data));
    }

    function readAll() {
      var tabledata = document.querySelector(".data_table");
      var elements = "";

      data.map(record => {
        elements += `<tr>
          <td>${record.name}</td>
          <td>${record.email}</td>
          <td><img src="${record.image || ''}" width="60" height="60" alt="Image"/></td>
          <td>${record.tel}</td>
          <td>${record.hobbies ? record.hobbies.join(", ") : ""}</td>
          <td>${record.gender || ""}</td>
          <td>${record.city || ""}</td>
          <td>
            <button class="edit" onclick="edit(${record.id})">Edit</button>
            <button class="delete" onclick="delet(${record.id})">Delete</button>
          </td>
        </tr>`;
      });

      tabledata.innerHTML = elements;
    }

    function showCreateForm() {
      document.querySelector('.create_form').style.display = 'flex';
      document.querySelector('.update_form').style.display = 'none';
    }

    function add() {
      let name = document.querySelector('.name').value;
      let email = document.querySelector('.email').value;
      let image = document.querySelector('.image').value;
      let tel = document.querySelector('.tel').value;

      let hobbyElement = document.querySelectorAll('.hobbies input[type="checkbox"]:checked');
      let hobbies = Array.from(hobbyElement).map(cb => cb.value);

      let gender = document.querySelector('input[name="gender"]:checked')?.value || "";
      let city = document.querySelector('.city').value;

      let newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
      let newObj = { id: newId, name, email, image, tel, hobbies, gender, city };

      data.push(newObj);
      localStorage.setItem("object", JSON.stringify(data));

      document.querySelector('.create_form').reset();
      document.querySelector('.create_form').style.display = 'none';
      readAll();
    }

    function delet(id) {
      data = data.filter(rec => rec.id !== id);
      localStorage.setItem("object", JSON.stringify(data));
      readAll();
    }

    function edit(id) {
      showUpdateForm();
      let obj = data.find(rec => rec.id === id);

      document.querySelector('.id').value = obj.id;
      document.querySelector('.uname').value = obj.name;
      document.querySelector('.uemail').value = obj.email;
      document.querySelector('.uimage').value = obj.image;
      document.querySelector('.utel').value = obj.tel;

      document.querySelectorAll('.uhobby').forEach(cb => {
        cb.checked = obj.hobbies.includes(cb.value);
      });

      document.querySelectorAll('.ugender-radio').forEach(rb => {
        rb.checked = obj.gender === rb.value;
      });

      const citySelect = document.querySelector('.ucity');
      citySelect.value = obj.city;
    }

    function showUpdateForm() {
      document.querySelector('.create_form').style.display = 'none';
      document.querySelector('.update_form').style.display = 'flex';
    }

    function update() {
      let id = parseInt(document.querySelector('.id').value);
      let name = document.querySelector('.uname').value;
      let email = document.querySelector('.uemail').value;
      let image = document.querySelector('.uimage').value;
      let tel = document.querySelector('.utel').value;

      let hobbyElements = document.querySelectorAll('.uhobbies input[type="checkbox"]:checked');
      let hobbies = Array.from(hobbyElements).map(cb => cb.value);

      let gender = document.querySelector('input[name="ugender"]:checked')?.value || "";
      let city = document.querySelector('.ucity').value;

      let index = data.findIndex(rec => rec.id === id);
      data[index] = { id, name, email, image, tel, hobbies, gender, city };
      localStorage.setItem("object", JSON.stringify(data));

      document.querySelector('.update_form').style.display = 'none';
      readAll();
    }