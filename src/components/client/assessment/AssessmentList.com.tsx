import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileTextOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { SurveyService } from '../../../services/survey/survey.service';
import { QuestionService } from '../../../services/question/question.service';
import type { SurveyResponse } from '../../../types/survey/Survey.res.type';
import type { SearchSurveyRequest } from '../../../types/survey/Survey.req.type';
import { SurveyType } from '../../../app/enums/surveyType.enum';
import AssessmentCard from './AssessmentCard.com';
import CustomSearch from '../../common/CustomSearch.com';
import { ROUTER_URL } from '../../../consts/router.path.const';
import { helpers } from '../../../utils';

interface AssessmentListProps {
  onStartAssessment?: (surveyId: string) => void;
  onViewResult?: (surveyId: string) => void;
}

interface SurveyWithQuestionCount extends SurveyResponse {
  questionCount: number;
}

export default function AssessmentList({ onStartAssessment, onViewResult }: AssessmentListProps) {
  const [surveys, setSurveys] = useState<SurveyWithQuestionCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [lastKeyword, setLastKeyword] = useState(''); // track last search keyword

  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  const isLoggedIn = token && userInfo;

  const navigate = useNavigate();

  const fetchSurveys = async (page: number = 1, search: string = '') => {
    try {

      setLoading(true);
      const params: SearchSurveyRequest = {
        pageNumber: page,
        pageSize: 12,
        filterByName: search
      };
      const response = await SurveyService.getAllSurveys(params);

      let surveysData: SurveyResponse[] = [];
      if (response.data?.data) {
        surveysData = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        surveysData = response.data;
      } else {
        setSurveys([]);
        setTotalPages(1);
        setTotalCount(0);
        return;
      }

      const riskAssessmentSurveys = surveysData.filter(
        (survey: SurveyResponse) =>
          survey.surveyType === SurveyType.RISK_ASSESSMENT || survey.type === SurveyType.RISK_ASSESSMENT
      );

      if (riskAssessmentSurveys.length === 0) {
        const allSurveysWithQuestionCount = await Promise.all(
          surveysData.map(async (survey: SurveyResponse) => {
            if (survey.questions && survey.questions.length > 0) {
              return { ...survey, questionCount: survey.questions.length };
            }
            const questionsResponse = await QuestionService.getQuestionBySurveyId(survey.id);
            const questionCount = questionsResponse.data?.length || 0;
            return { ...survey, questionCount };
          })
        );
        setSurveys(allSurveysWithQuestionCount);
        setTotalCount(response.data?.totalCount || allSurveysWithQuestionCount.length);
      } else {
        const surveysWithQuestionCount = await Promise.all(
          riskAssessmentSurveys.map(async (survey: SurveyResponse) => {
            if (survey.questions && survey.questions.length > 0) {
              return { ...survey, questionCount: survey.questions.length };
            }
            const questionsResponse = await QuestionService.getQuestionBySurveyId(survey.id);
            const questionCount = questionsResponse.data?.length || 0;
            return { ...survey, questionCount };
          })
        );
        setSurveys(surveysWithQuestionCount);
        setTotalCount(response.data?.totalCount || surveysWithQuestionCount.length);
      }

      setTotalPages(response.data?.totalPages || 1);
    } catch (error) {
      setSurveys([]);
      setTotalPages(1);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys(1, '');
  }, []);

  const handleStartAssessment = (surveyId: string) => {
    if (!isLoggedIn) {
      helpers.notificationMessage("Bạn cần đăng nhập để truy cập trang này", "warning");
      navigate?.(ROUTER_URL.AUTH.LOGIN);
      return;
    }
    if (onStartAssessment) {
      onStartAssessment(surveyId);
    } else {
      // Default navigation logic
      console.log('Starting assessment:', surveyId);
    }
  };

  const handleViewResult = (surveyId: string) => {
    if (onViewResult) {
      onViewResult(surveyId);
    } else {
      // Default navigation logic
      console.log('Viewing result for:', surveyId);
    }
  };

  // Handle search from CustomSearch
  const handleSearch = (keyword: string) => {
    setCurrentPage(1);
    setLastKeyword(keyword);
    fetchSurveys(1, keyword);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchSurveys(page, lastKeyword);
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'screening':
        return {
          label: 'Sàng lọc',
          color: 'bg-blue-100 text-blue-800',
          icon: InfoCircleOutlined
        };
      case 'comprehensive':
        return {
          label: 'Toàn diện',
          color: 'bg-purple-100 text-purple-800',
          icon: FileTextOutlined
        };
      case 'specialized':
        return {
          label: 'Chuyên biệt',
          color: 'bg-orange-100 text-orange-800',
          icon: TeamOutlined
        };
      default:
        return {
          label: 'Đánh giá rủi ro',
          color: 'bg-red-100 text-red-800',
          icon: InfoCircleOutlined
        };
    }
  };

  const getDifficultyInfo = (questionsCount: number) => {
    if (questionsCount <= 5) {
      return {
        label: 'Dễ',
        color: 'bg-green-100 text-green-800'
      };
    } else if (questionsCount <= 10) {
      return {
        label: 'Trung bình',
        color: 'bg-yellow-100 text-yellow-800'
      };
    } else {
      return {
        label: 'Khó',
        color: 'bg-red-100 text-red-800'
      };
    }
  };

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.name.toLowerCase().includes(lastKeyword.toLowerCase()) ||
      survey.description?.toLowerCase().includes(lastKeyword.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Đánh Giá Rủi Ro & Khảo Sát
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thực hiện các bài đánh giá rủi ro chuyên nghiệp để xác định mức độ nguy cơ sử dụng chất gây nghiện
            và nhận được khuyến nghị phù hợp từ các chuyên gia
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <CustomSearch
              placeholder="Tìm kiếm bài đánh giá rủi ro..."
              onSearch={handleSearch}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingOutlined className="text-4xl text-blue-600" />
            <span className="ml-3 text-lg text-gray-600">Đang tải bài đánh giá rủi ro...</span>
          </div>
        )}

        {/* Assessment Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurveys.map((survey) => {
              const categoryInfo = getCategoryInfo(survey.surveyType || 'risk-assessment');
              const difficultyInfo = getDifficultyInfo(survey.questionCount);
              const CategoryIcon = categoryInfo.icon;

              return (
                <AssessmentCard
                  key={survey.id}
                  survey={survey}
                  categoryInfo={categoryInfo}
                  difficultyInfo={difficultyInfo}
                  CategoryIcon={CategoryIcon}
                  onStartAssessment={handleStartAssessment}
                  onViewResult={handleViewResult}
                />
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredSurveys.length === 0 && (
          <div className="text-center py-12">
            <ExclamationCircleOutlined className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không tìm thấy bài đánh giá rủi ro
            </h3>
            <p className="text-gray-600">
              Hiện tại chưa có bài đánh giá rủi ro nào. Vui lòng thử lại sau.
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col items-center mt-8">
            <span className="text-sm text-gray-500 mb-2">
              Trang {currentPage} / {totalPages} &nbsp;|&nbsp; Tổng số: {totalCount}
            </span>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Tại sao nên thực hiện đánh giá rủi ro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <InfoCircleOutlined className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Phát hiện sớm
              </h3>
              <p className="text-gray-600">
                Phát hiện sớm các dấu hiệu sử dụng chất gây nghiện để có biện pháp can thiệp kịp thời.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TeamOutlined className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Khuyến nghị cá nhân
              </h3>
              <p className="text-gray-600">
                Nhận được khuyến nghị hành động cụ thể dựa trên mức độ rủi ro của bạn.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleOutlined className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Theo dõi tiến độ
              </h3>
              <p className="text-gray-600">
                Theo dõi sự thay đổi và tiến bộ của bạn qua các bài đánh giá định kỳ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
