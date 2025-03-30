  <template>
    <ConfirmationDash v-if="isConfirmationModalOpen === true" :accion="confirmationStuff.accion" tipo="usuario" :nombre="confirmationStuff.nombre" @close="closeConfirmation" @act="confirmationStuff.action"/>
              <div className='w-full h-[88vh] p-[2vw] overflow-scroll'>
                    <div class="flex w-full justify-between">
                      <p className='font-semibold text-2xl'>Usuarios</p>
                      <button class="bg-green-600 w-[7vw] text-white rounded-md py-1 cursor-pointer" @click="openModal">Agregar</button>
                    </div>
                    <table className='  w-full table-fixed rounded-3xl my-[3vh] bg-[#dfe6da]'>
                        <thead className=''>
                            <tr className='border-zinc-400  text-zinc-600'>
                                <th className='font-semibold px-[1vw] py-[1vh] w-[5%]'>Id</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Nombre</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Apellido</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Correo</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Telefono</th>
                                <th className='font-semibold px-[1vw] py-[1vh]'>Rol</th>
                                <th className='font-semibold px-[1vw] py-[1vh] w-[20%]'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className='text-zinc-600'>
                            <tr v-for="(item, index) in data" :key="index" :class="` ${item.baneado === true && 'bg-red-200'} `">
                                <td className='px-[1vw] py-[1vh] border-t border-r border-zinc-400 text-center'>{{ item.idUsuario }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.nombre }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.apellido}}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.correoElectronico }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.telefono }}</td>
                                <td className='px-[1vw] py-[1vh] border-t border-x border-zinc-400'>{{ item.nombreRol }}</td>

                                <td className='px-[1vw] py-[1vh] border-t border-l border-zinc-400 '>
                                  <div class="w-full flex justify-center">
                                    <button class="bg-black w-[30%] text-white rounded-md py-1 m-auto cursor-pointer" v-if="item.baneado === false" @click="openConfirmation('banear', item.nombre, () => banUser(item.idUsuario))" >Banear</button>
                                    <button class="bg-white text-black w-[30%] rounded-md py-1 m-auto cursor-pointer" v-else  @click="openConfirmation('unbanear', item.nombre, () => unbanUser(item.idUsuario))">Unbanear</button>
                                    <button class="bg-red-500 w-[30%] text-white rounded-md py-1 m-auto cursor-pointer" @click="openConfirmation('eliminar', item.nombre, () => deleteItem(item.idUsuario))">Eliminar</button>
                                    <button class="bg-yellow-500 w-[30%] text-white rounded-md py-1 m-auto" @click="openEditModal(item.idUsuario)" >Editar</button>
                                  </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <AddUserModal :isOpen="isModalOpen" :isEdit="isEdit" :editId="editId" @close="closeModal"  />
  </template>

<script setup lang="ts">
import { getUsersService, deleteUserService, banUserService } from '@/services/usersService';
import AddUserModal from '@/components/Modals/AddUserModal.vue';
import ConfirmationDash from '@/components/Modals/ConfirmationDash.vue';
import { ref } from 'vue';
import axios from 'axios'
import type { banUserDto } from '@/dtos/banUserDto';


const isModalOpen = ref(false);
const isConfirmationModalOpen = ref(false)
const confirmationStuff = ref({
  accion: '',
  nombre: '',
  action: () => {},
})

const isEdit = ref(false);
const editId = ref(0);
const data = ref();

const openConfirmation = (accion:string, nombre:string, action: () => void) => {
  confirmationStuff.value.accion = accion
  confirmationStuff.value.nombre = nombre
  confirmationStuff.value.action = action;


  isConfirmationModalOpen.value = true
}
const closeConfirmation = () => {
  confirmationStuff.value.accion = ''
  confirmationStuff.value.nombre = ''

  isConfirmationModalOpen.value = false
}

const fetchData = async () => {
    try {
      const response = await getUsersService()
      data.value = response;
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.message);
      } else{
        console.error(error);
      }
    }
  }

  const deleteItem = async (id:number) => {
    try {
      await deleteUserService(id)

      closeConfirmation()
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const banUser = async (id:number) => {
    try {
      const banUser:banUserDto = { idUsuario: id, baneado: true }
      await banUserService(banUser)

      closeConfirmation()
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const unbanUser = async (id:number) => {
    try {
      const banUser:banUserDto = { idUsuario: id, baneado: false }
      await banUserService(banUser)

      closeConfirmation()
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  fetchData();

  const openModal = () => { isModalOpen.value = true; };
  const openEditModal = (id:number) => { isModalOpen.value = true; isEdit.value = true ; editId.value = id};
  const closeModal = () => { isModalOpen.value = false; isEdit.value = false ; editId.value = 0; fetchData()};

</script>
