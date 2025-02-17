// src/pages/TaskManagementPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import BangTinhNang from '../modules/quan_ly_chi_tiet/components/bang_tinh_nang';
import BangTongHop from '../modules/quan_ly_chi_tiet/components/bang_tong_hop';

const TaskManagementPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const [projectInfo, setProjectInfo] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProjectInfo = async () => {
      if (projectId) {
        setLoading(true);
        try {
          // Giả lập việc fetch dữ liệu
          const mockData = {
            id: projectId,
            name: `Dự án ${projectId}`,
            description: "Mô tả dự án"
          };
          setProjectInfo(mockData);
        } catch (error) {
          toast({
            title: "Lỗi",
            description: "Không thể tải thông tin dự án",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      }
    };
    loadProjectInfo();
  }, [projectId, toast]);

  const handleAddNew = () => {
    const paths = {
      0: "/quan-ly-chi-tiet/tinh-nang/them-moi",
      1: "/quan-ly-chi-tiet/backend/them-moi",
      2: "/quan-ly-chi-tiet/kiem-thu/them-moi",
    };
    navigate(paths[activeTab]);
  };

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={5}>
      <VStack spacing={6} align="stretch">
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/quan-ly-du-an">
              Dự án
            </BreadcrumbLink>
          </BreadcrumbItem>
          {projectInfo && (
            <BreadcrumbItem>
              <Text>{projectInfo.name}</Text>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem isCurrentPage>
            <Text>Quản lý nhiệm vụ chi tiết</Text>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box bg={bgColor} p={6} borderRadius="lg" shadow="md">
          <VStack spacing={6} align="stretch">
            <HStack justify="space-between">
              <Heading size="lg">
                {projectInfo
                  ? `Nhiệm vụ - ${projectInfo.name}`
                  : "Quản lý nhiệm vụ chi tiết"}
              </Heading>
              {activeTab !== 3 && (
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  onClick={handleAddNew}
                >
                  Thêm{" "}
                  {activeTab === 0
                    ? "tính năng"
                    : activeTab === 1
                    ? "backend"
                    : "kiểm thử"}
                </Button>
              )}
            </HStack>

            <Tabs
              isFitted
              variant="enclosed"
              onChange={setActiveTab}
              colorScheme="blue"
            >
              <TabList>
                <Tab>Tính năng</Tab>
                <Tab>Backend</Tab>
                <Tab>Kiểm thử</Tab>
                <Tab>Tổng hợp</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <BangTinhNang projectId={projectId} />
                </TabPanel>
                <TabPanel>
                  <BangTinhNang projectId={projectId} phanHe="backend" />
                </TabPanel>
                <TabPanel>
                  <BangTinhNang projectId={projectId} phanHe="kiemThu" />
                </TabPanel>
                <TabPanel>
                  <BangTongHop projectId={projectId} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default TaskManagementPage;