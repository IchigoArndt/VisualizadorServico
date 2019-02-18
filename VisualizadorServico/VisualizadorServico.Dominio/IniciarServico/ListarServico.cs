using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading.Tasks;

namespace VisualizadorServico.Dominio.IniciarServico
{
    public class ListarServico
    {
       public List<String> Listar()
        {
            ManagementClass management = new ManagementClass("Win32_Process");
            ManagementObjectCollection mCollection = management.GetInstances();
            List<String> nomeServico = new List<string>();
            nomeServico.Add("Nome:"+ "        "+"ID:");
            string nameService = "";
            string procesService = "";
            foreach (ManagementObject process in mCollection)
            {
                nameService = (string)process["Name"];
                procesService = process["ProcessId"].ToString();
                if (nameService.Contains("aspnet"))
                {
                    nomeServico.Add(nameService + "        " + procesService);
                }
                   
            }
            return nomeServico;
        }
    }
}
